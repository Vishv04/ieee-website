import express from 'express';
const router = express.Router();

import { uploadAchievement, updateAchievement, deleteAchievement } from '../controllers/achievmentController.js';
import { uploadEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { getContactUs } from '../controllers/contactUsController.js';
import { getUpdates } from '../controllers/getUpdatesController.js';
import { uploadMember, updateMember, deleteMember } from '../controllers/memberController.js';
import { adminLogin, getAllAdmins, addAdmin, deleteAdmin } from '../controllers/adminController.js';


// Achievements (protected)
router.post('/achievements/upload', uploadAchievement);
router.post('/achievements/update/:id', updateAchievement);
router.delete('/achievement/:id', deleteAchievement);

// events (protected)
router.post('/events/upload', uploadEvent);
router.post('/events/update/:id', updateEvent);
router.delete('/event/:id', deleteEvent);

// Contact us (protected - admin only)
router.get('/contact-us', getContactUs);

// Get updates (protected - admin only)
router.get('/updates', getUpdates);

// Members (protected)
router.post('/members/upload', uploadMember);
router.post('/members/update/:id', updateMember);
router.delete('/member/:id', deleteMember);

// Admins (protected)
router.post('/login', adminLogin);
router.get('/getAllAdmins', getAllAdmins);
router.post('/addAdmin', addAdmin);
router.delete('/deleteAdmin/:id', deleteAdmin);

export default router;

