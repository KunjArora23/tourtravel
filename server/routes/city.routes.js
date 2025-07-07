import express, { Router } from 'express'
import { createCity, getAllCities, getCityById, getCityWithTours } from '../controllers/cityTour.controller.js';
import upload from '../utils/multer.js'; // Assuming you have a multer setup for file uploads


const cityRouter = express.Router();


console.log("in city.routes.js")


cityRouter.route("/getAll").get(getAllCities);
cityRouter.get("/gettours/:id", getCityWithTours);
cityRouter.get("/get/:id", getCityById);

export { cityRouter };