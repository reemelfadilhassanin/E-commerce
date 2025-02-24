import express from 'express'; // Using `import` for express
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming this is in ES Module format as well
import nodemailer from 'nodemailer';
import Otp from '../models/Otp.js'; // Import the Otp model
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const router = express.Router();

// Create a transporter for sending OTP emails
const transporter = nodemailer.createTransport({
  service: 'smtp-mail.outlook.com', // or any email service you're using
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
  tls: {
    rejectUnauthorized: false, // Disable SSL certificate verification (use with caution)
  },
});

// Helper function to generate a 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Google login route (added to provide the Google login option)
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google login callback route (the route where Google will redirect after successful authentication)
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // After successful login, you can send a JWT or user data.
    // For example, you might want to issue a JWT as well:
    const accessToken = jwt.sign(
      { id: req.user._id, isAdmin: req.user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );
    // Send back the user data along with the access token
    const { password, ...others } = req.user._doc; // Exclude password from response
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

// Login route - Enable login with username and password
// Login route - Enable login with email and password
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Change from username to email

  if (!email || !password) {
    return res.status(400).json('Both email and password are required.');
  }

  try {
    const user = await User.findOne({ email }); // Find by email, not username
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

    const { password: userPassword, ...others } = user._doc; // Exclude password from response
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong while logging in.',
      error: err.message,
    });
  }
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json('Email is required.');
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json('User not found.');
    }

    const otp = generateOtp();

    let otpRecord = await Otp.findOne({ email });

    if (otpRecord) {
      otpRecord.otp = otp;
      otpRecord.createdAt = new Date();
      await otpRecord.save();
    } else {
      otpRecord = new Otp({ email, otp });
      await otpRecord.save();
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json('Failed to send OTP.');
      }
      console.log('Email sent successfully:', info.response);
      res.status(200).json('OTP sent to your email.');
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error requesting password reset.',
      error: err.message,
    });
  }
});

// Verify OTP route
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json('Email and OTP are required.');
  }

  try {
    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json('OTP not found or expired.');
    }

    const isExpired =
      new Date() - new Date(otpRecord.createdAt) > 10 * 60 * 1000;

    if (isExpired) {
      return res.status(400).json('OTP expired. Please request a new one.');
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json('Invalid OTP.');
    }

    res.status(200).json('OTP verified. You can now reset your password.');
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error verifying OTP.',
      error: err.message,
    });
  }
});

// Reset password route (after OTP verification)
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json('Email and new password are required.');
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json('User not found.');
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      newPassword,
      process.env.PASS_SEC
    ).toString();

    user.password = encryptedPassword;
    await user.save();

    await Otp.deleteOne({ email });

    res.status(200).json('Password has been successfully reset.');
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error resetting the password.',
      error: err.message,
    });
  }
});

// Export the router as default
export default router;
