import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv";

dotenv.config({})

cloudinary.config({
  api_key: "358598486164961",
  api_secret:"UcIsl0baDOMEdfafhS-1tsKhR2k",
  cloud_name: "kunjbackend",
})

const uploadMedia = async (file, foldername = "TourTravels") => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: foldername,

    })

    return uploadResponse;
  } catch (error) {
    console.log(error)
  }
}

const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.log(error)
  }
}

const deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log(error);
  }
};


export { uploadMedia, deleteMediaFromCloudinary, deleteVideoFromCloudinary }