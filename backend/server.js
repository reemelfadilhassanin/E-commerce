import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chalk from 'chalk';
import cors from 'cors';
import path from 'path';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import productRoute from './routes/product.js';
import cartRoute from './routes/cart.js';
import orderRoute from './routes/order.js';
import adminRoute from './routes/adminRoute.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fs from 'fs';

dotenv.config();

const app = express();

// Middleware configuration
app.use(cookieParser());  // Cookie parsing

// Session configuration
app.use(
  session({
    secret: 'your-session-secret', 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      maxAge: 24 * 60 * 60 * 1000, // 1 day session
    },
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' })); // JSON body parsing
app.use(express.urlencoded({ limit: '10mb', extended: true })); // URL-encoded body parsing

// CORS setup
const corsOptions = {
  origin: 'http://localhost:5173',  // Update for your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow cookies
};

app.use(cors(corsOptions));  // Enable CORS

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
    const connection = await mongoose.connect(mongoURI);
    console.log(chalk.green(`MongoDB Connected: ${connection.connection.host}`));
  } catch (error) {
    console.error(chalk.red('Error connecting to MongoDB:', error.message));
    process.exit(1);
  }
};

connectDB();

// Routes setup
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/admin', adminRoute);

// Serve frontend build files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Test route for API status check
app.get('/test', (req, res) => {
  res.send('API is running');
});

// Static upload directory handling
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.blue(`Server running at http://localhost:${PORT}`));
});
