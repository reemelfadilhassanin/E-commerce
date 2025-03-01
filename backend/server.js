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
// import stripeRoute from './routes/stripe.js';
import User from './models/User.js'; // Import User model
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import adminRoute from './routes/adminRoute.js';
dotenv.config();

const app = express();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
      scope: ['profile', 'email'], // Ensure this is correct
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            isAdmin: false,
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id); // Store the user ID in the session
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Attach the user object to the session
  } catch (err) {
    done(err, null); // Handle errors in deserialization
  }
});

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
    const connection = await mongoose.connect(mongoURI);
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

// Session setup for Passport.js
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session()); // This is necessary for handling sessions

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api', adminRoute);
// app.use("/api/checkout", stripeRoute);

// Serve frontend build files (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Test route
app.get('/test', (req, res) => {
  res.send('API is running');
});

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.blue(`Server running at http://localhost:${PORT}`));
});
