import express from 'express'; // Using `import` for express
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming this is in ES Module format as well
import nodemailer from 'nodemailer';
import Otp from '../models/Otp.js'; // Import the Otp model
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const router = express.Router();

// Google login route (added to provide the Google login option)
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const accessToken = jwt.sign(
      { id: req.user._id, isAdmin: req.user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );
    const { password, ...others } = req.user._doc;
    res.status(200).json({ ...others, accessToken });
  }
);

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, isAdmin } = req.body; // Allow isAdmin from the body

  if (!username || !email || !password) {
    return res
      .status(400)
      .json('All fields (username, email, password) are required.');
  }

  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    isAdmin: username === 'admin' ? true : isAdmin || false,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong while registering the user.',
      error: err.message,
    });
  }
});

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

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res.status(401).json('Incorrect password.');
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    const { password: userPassword, ...others } = user._doc;

    // Redirect logic based on admin status
    if (user.isAdmin) {
      return res.status(200).json({
        ...others,
        accessToken,
        message:
          'Login successful! You are an admin. Redirecting to admin page...',
      });
    } else {
      return res.status(200).json({
        ...others,
        accessToken,
        message: 'Login successful! Redirecting to user dashboard...',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong while logging in.',
      error: err.message,
    });
  }
});

// Export the router as default
export default router;
