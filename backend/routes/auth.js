import express from 'express'; // Using `import` for express
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming this is in ES Module format as well
import nodemailer from 'nodemailer';
import Otp from '../models/Otp.js'; // Import the Otp model

const router = express.Router();
import expressSession from 'express-session';

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

router.use(expressSession({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Secret to sign the session ID cookie
  resave: false,
  saveUninitialized: true, // Save new sessions even if they are uninitialized
  cookie: { secure: false, maxAge: 3600000 }, // Cookie settings, secure: true for HTTPS, maxAge: 1 hour
}));

// Login route - Enable login with email and password
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

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res.status(401).json('Incorrect password.');
    }

    // After successful login, save the user info in session
    req.session.user = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    return res.status(200).json({
      message: 'Login successful!',
      user: req.session.user,  // This will show the session data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong while logging in.',
      error: err.message,
    });
  }
});

export default router;
