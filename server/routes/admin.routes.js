import express, { Router } from 'express'
import { createCity, deleteCity , getAllCities, updateCity } from '../controllers/cityTour.controller.js';
import upload from '../utils/multer.js'; // Assuming you have a multer setup for file uploads
import { adminLogin, adminLogout, adminSignup } from '../controllers/admin.controller.js';
import { adminAuth } from '../middleware/authAdmin.middleware.js';
import { createTour, getToursByCityId ,deleteTour, updateTour} from '../controllers/Tour.controller.js';


const adminRouter = express.Router();


console.log("in admin.routes.js")

adminRouter.route("/signup").post(adminSignup);
adminRouter.route("/login").post(adminLogin);
adminRouter.get("/logout", adminLogout);


adminRouter.route("/createcity").post(upload.single("image"), adminAuth, createCity);
adminRouter.route("/createtour").post(
    // upload.array("images", 5),
    // Accept max 5 images with key `images`

    upload.single("image"),
    adminAuth,
    createTour
);
console.log("in admin.routes.js after createTour")
adminRouter.route('/delete-city/:id').delete(adminAuth,deleteCity)
adminRouter.route('/delete-tour/:id').delete(adminAuth,deleteTour)
adminRouter.route('/get-tours/city/:id').get(adminAuth,getToursByCityId)
adminRouter.put("/updatecity/:id", upload.single("image"),adminAuth, updateCity);

adminRouter.put('/updatetour/:id',upload.single("image"),adminAuth, updateTour);


export { adminRouter };