import express, { Router } from 'express'

import { 
  createTour, 
  getTourById, 
  getFeaturedTours, 
  toggleFeaturedTour, 
  getAllToursWithFeatured,
  updateTourOrder,
  reorderTours
} from '../controllers/Tour.controller.js';


const tourRouter = express.Router();


console.log("in tour.routes.js")

// Public routes
tourRouter.get('/featured', getFeaturedTours);
tourRouter.get('/:id', getTourById);

// Admin routes
tourRouter.get('/admin/all', getAllToursWithFeatured);
tourRouter.patch('/admin/:id/toggle-featured', toggleFeaturedTour);
tourRouter.patch('/admin/order', updateTourOrder);
tourRouter.post('/admin/reorder', reorderTours);

export { tourRouter };