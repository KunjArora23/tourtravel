import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://kunjarora23:Kunj123@tourtravels.hfadxbn.mongodb.net/TourTravels';

    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🛑 MongoDB connection closed due to app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export { connectDB };