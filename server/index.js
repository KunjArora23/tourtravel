import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";


// Import configurations and middleware
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Import routes
// import {packageRoutes} from './routes/packageRoutes.js';
// import {enquiryRoutes} from './routes/enquiryRoutes.js';

// Import utilities
// import { seedPackages } from './utils/seedData.js';
import { cityRouter } from './routes/city.routes.js';
import { tourRouter } from './routes/tour.routes.js';
import { reviewRouter } from './routes/review.routes.js';
import { contactRouter } from './routes/contact.routes.js';

import { adminRouter } from './routes/admin.routes.js';

dotenv.config();

console.log("in app,js")

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to database
connectDB()


// Middleware
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
})


// apis

app.use("/api/v1/city", cityRouter)
app.use("/api/v1/tour", tourRouter)
app.use("/api/v1/review", reviewRouter)
app.use('/api/v1/contact', contactRouter);

// admin apis

app.use("/api/v1/admin", adminRouter);









// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   next();
// });

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // API Routes
// app.use('/api/packages', packageRoutes);
// app.use('/api/enquiries', enquiryRoutes);

// // Seed data endpoint (for development)
// app.post('/api/seed', async (req, res) => {
//   try {
//     const packages = await seedPackages();
//     res.json({ 
//       message: 'Sample data seeded successfully',
//       packagesCount: packages.length
//     });
//   } catch (error) {
//     console.error('Seeding error:', error);
//     res.status(500).json({ 
//       message: 'Error seeding data', 
//       error: error.message 
//     });
//   }
// });

// // API documentation route
// app.get('/api', (req, res) => {
//   res.json({
//     message: 'Incredible Tours API',
//     version: '1.0.0',
//     endpoints: {
//       packages: '/api/packages',
//       enquiries: '/api/enquiries',
//       health: '/api/health',
//       seed: '/api/seed (POST)'
//     },
//     documentation: 'https://github.com/your-repo/api-docs'
//   });
// });


// // Catch-all route for undefined endpoint


// // Error handling middleware
// app.use(notFound);
// app.use(errorHandler);

// // Start server
// const startServer = async () => {
//   try {
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//       console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
//       console.log(`📚 API docs: http://localhost:${PORT}/api`);
//       console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received, shutting down gracefully');
//   process.exit(0);
// });

// process.on('SIGINT', () => {
//   console.log('SIGINT received, shutting down gracefully');
//   process.exit(0);
// });