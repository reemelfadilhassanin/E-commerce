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
import bodyParser from 'body-parser';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

dotenv.config();

const app = express();

// Middleware configuration
app.use(cookieParser()); // Add cookie parser to handle cookies

// Setup session with a secret and other options
app.use(
  session({
    secret: 'your-session-secret', // Make sure this is a strong secret for production
    resave: false, 
    saveUninitialized: false, 
    cookie: {
      httpOnly: true, // Helps to prevent client-side access to cookies
      secure: false, // Set to true in production if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day session
    },
  })
);

app.use(cors());
app.use(express.json()); // Middleware to parse JSON body

// Increase JSON body limit for larger payloads
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

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

// Routes
app.use('/api/auth', authRoute); // Authentication routes
app.use('/api/users', userRoute); // User-related routes
app.use('/api/products', productRoute); // Product-related routes
app.use('/api/carts', cartRoute); // Cart-related routes
app.use('/api/orders', orderRoute); // Order-related routes
app.use('/api/admin', adminRoute); // Admin routes

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

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL for local development (adjust if needed)
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allow cookies to be sent along with requests
  })
);

const __dirname = path.resolve(); // Resolves correct directory when using ES modules

// Fix for the path if OneDrive or non-standard directory is used
const uploadDir = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists or create it
if (!fs.existsSync(uploadDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads directory created at:', uploadDir);
} else {
  console.log('Uploads directory already exists at:', uploadDir);
}

// Serve the uploads directory as a static folder
app.use('/uploads', express.static(uploadDir));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.blue(`Server running at http://localhost:${PORT}`));
});
