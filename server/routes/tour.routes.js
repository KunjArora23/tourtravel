import express, { Router } from 'express'

import { createTour, getTourById } from '../controllers/Tour.controller.js';


const tourRouter = express.Router();


console.log("in tour.routes.js")


tourRouter.get('/:id', getTourById);

export { tourRouter };