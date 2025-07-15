import express from 'express';
import { submitContactForm, availableSlots } from '../controllers/contact.controller.js';
import { getAllContactSubmissions } from '../controllers/contactSubmission.admin.js';
import { adminAuth } from '../middleware/authAdmin.middleware.js';

const contactRouter = express.Router();

contactRouter.post('/', submitContactForm);
contactRouter.get('/available-slots', availableSlots);

// Admin endpoints
contactRouter.get('/admin/submissions', adminAuth, getAllContactSubmissions);

export { contactRouter }; 