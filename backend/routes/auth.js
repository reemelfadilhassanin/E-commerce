// Using `import` for express
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming this is in ES Module format as well
import nodemailer from 'nodemailer';
import Otp from '../models/Otp.js'; // Import the Otp model
import express from 'express';



import session from 'express-session'; // Make sure to import session for proper configuration


const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json('All fields (username, email, password) are required.');
  }

  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json('Username is already taken.');
  }

  // Check if the email already exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json('Email is already in use.');
  }

  // Default `isAdmin` to false, but set to true if username is 'admin'
  const isAdmin = username === 'admin' ? true : false;

  // Create the new user with the appropriate `isAdmin` value
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    isAdmin, // Set isAdmin based on username
  });

  try {
    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return a response with the saved user data
    res.status(201).json({
      message: 'User registered successfully.',
      user: savedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong while registering the user.',
      error: err.message,
    });
  }
});

router.use(
  session({
    secret: 'your-session-secret',  // Ensure to replace with your secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,   // Prevent access from JavaScript
      secure: process.env.NODE_ENV === 'production',  // Secure cookie in production
      sameSite: 'None',  // Required for cross-origin requests
      maxAge: 24 * 60 * 60 * 1000,  // 1 day
    },
  })
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Both email and password are required.');
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json('Wrong email or password.');
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res.status(401).json('Incorrect password.');
    }

    // Set session after successful login
    req.session.user = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    // Log session details
    console.log('Session Cookie login:', req.sessionID);
    console.log('Session Object:', req.session);
    console.log('Cookies all:', req.cookies);  // Log all cookies (including session cookie)

    return res.status(200).json({
      message: 'Login successful!',
      user: req.session.user,
      redirectTo: user.isAdmin ? '/admin' : '/home',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong while logging in.',
      error: err.message,
    });
  }
});

// Check session route
router.get('/check-session', (req, res) => {
  console.log('Session Data in Check Session:', req.session);
  if (req.session.user) {
    return res.status(200).json({
      loggedIn: true,
      isAdmin: req.session.user.isAdmin,
    });
  } else {
    return res.status(200).json({
      loggedIn: false,
      isAdmin: false,
    });
  }
});

export default router;
