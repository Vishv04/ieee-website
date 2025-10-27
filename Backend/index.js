import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/database.js';
import { cloudinaryConnect } from './config/cloudinary.js';
import allRoutes from './routes/routes.js';
import fileUpload from 'express-fileupload';
import authMiddleware from './middleware/authMiddleware.js';

// Import controllers for public routes
import { getAchievements } from './controllers/achievmentController.js';
import { getEvents } from './controllers/eventController.js';
import { contactUsEnroll } from './controllers/contactUsController.js';
import { getUpdatesEnroll } from './controllers/getUpdatesController.js';
import { getMembers, memberFront } from './controllers/memberController.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Body parser middleware to parse JSON body
app.use(express.urlencoded({ extended: true })); // Body parser middleware to parse URL-encoded bodies
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://ieee-vishv.vercel.app",
      "https://ieeeausb.in",
      "http://ieeeausb.in",
      "https://www.ieeeausb.in",
      "http://www.ieeeausb.in",
      "http://localhost:5173"
    ];
    // allow requests with no origin (e.g. Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"]
}));

// make sure preflight is handled
app.options("*", cors());


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));

// Database connection
dbConnect();
cloudinaryConnect();

// Routes - separate public and protected routes
const publicRouter = express.Router();
const protectedRouter = express.Router();

// Public routes (no auth required)
publicRouter.get('/achievements', getAchievements);
publicRouter.get('/events', getEvents);
publicRouter.post('/contact-us/enroll', contactUsEnroll);
publicRouter.post('/updates/enroll', getUpdatesEnroll);
publicRouter.get('/members', getMembers);
publicRouter.get('/members-front', memberFront);

// Protected routes (auth required)
protectedRouter.use(authMiddleware);
protectedRouter.use('/', allRoutes);

app.use('/api', publicRouter);
app.use('/api', protectedRouter);

app.get("/" , (req,res) => {
    return res.json({
        success: true,
        message: "Boooooooooom, your server is started"
    })
})

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



