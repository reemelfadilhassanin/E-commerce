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
//import stripeRoute from './routes/stripe.js';

dotenv.config();

const app = express();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      chalk.green(`MongoDB Connected: ${connection.connection.host}`)
    );
  } catch (error) {
    console.error(chalk.red('Error connecting to MongoDB:', error.message));
    process.exit(1);
  }
};

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

// Serve frontend build files
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  // Serve index.html for all routes that do not match API routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.blue(`Server running at http://localhost:${PORT}`));
});

