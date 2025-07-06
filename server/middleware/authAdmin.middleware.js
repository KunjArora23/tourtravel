// middleware/adminAuth.js
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js'; // Adjust the path as necessary

const JWT_SECRET="mysecretkey"
const NODE_ENV="production"

export const adminAuth = async (req, res, next) => {
 try {
     
     const token = req.cookies.adminToken
    
    if (!token) {
      return res.status(401).json({
        message: "Admin not authenticated",
        success: false,
      });
    }
    const decode =  jwt.verify(token, JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.adminId;
    next();
  } catch (error) {
    console.log(error);
  }
};

