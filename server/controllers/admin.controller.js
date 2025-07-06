// controllers/adminController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model.js';


const JWT_SECRET = "mysecretkey"
const NODE_ENV = "production"

export const adminSignup = async (req, res) => {
    const { email, password } = req.body;
    console.log("Admin signup request:", req.body);

    try {
        // 1. Check if admin already exists
        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, error: "Admin already exists" });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create and save admin
        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();

        // 4. Generate JWT
        const token = jwt.sign(
            { _id: newAdmin._id, email: newAdmin.email, role: "admin" },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 5. Set cookie
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400000, // 1 day
        });

        return res.status(201).json({
            success: true,
            message: "Admin signed up successfully",
        });

    } catch (error) {
        console.error("Admin signup error:", error.message);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};



export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { _id: admin._id, email: admin.email, role: "admin" },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        // ✅ Production-ready secure cookie
        res.cookie("adminToken", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ success: true, message: "Admin logged in successfully" });

    } catch (error) {
        console.error("Admin login error:", error.message);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

export const adminLogout = (req, res) => {
    res.clearCookie("adminToken", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict"
    });

    return res.status(200).json({ success: true, message: "Admin logged out successfully" });
};