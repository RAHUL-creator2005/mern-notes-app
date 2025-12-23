import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB("mongodb+srv://rahul:1234@cluster1.cionuxn.mongodb.net/");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Notes App API is running!',
    status: 'OK'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/notes', noteRoutes);

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
});
