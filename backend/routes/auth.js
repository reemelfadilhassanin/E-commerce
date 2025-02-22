import express from 'express'; // Using `import` for express
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming this is in ES Module format as well
import nodemailer from 'nodemailer';
import Otp from '../models/Otp.js'; // Import the Otp model

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
    rejectUnauthorized: false, // This will disable the SSL certificate verification (use with caution)
  },
});

// Helper function to generate a 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, isAdmin } = req.body; // Allow isAdmin from the body

  if (!username || !email || !password) {
    return res
      .status(400)
      .json('All fields (username, email, password) are required.');
  }

  // If the username is 'admin', force set isAdmin to true (you can also set this conditionally based on the request)
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    isAdmin: username === 'admin' ? true : isAdmin || false, // Default to false or set based on the input
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
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Change 'email' to 'username'

  if (!username || !password) {
    return res.status(400).json('Both username and password are required.');
  }

  try {
    const user = await User.findOne({ username }); // Check by username instead of email
    if (!user) {
      return res.status(401).json('Wrong username or password.');
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
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
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

    // Generate OTP
    const otp = generateOtp();

    // Check if OTP already exists for the email
    let otpRecord = await Otp.findOne({ email });

    if (otpRecord) {
      // Update the OTP if it already exists
      otpRecord.otp = otp;
      otpRecord.createdAt = new Date(); // Update the timestamp
      await otpRecord.save();
    } else {
      // If no OTP record exists, create a new one
      otpRecord = new Otp({
        email,
        otp,
      });
      await otpRecord.save();
    }

    // Send OTP to the user's email
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
    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 }); // Get the latest OTP record for this email

    if (!otpRecord) {
      return res.status(400).json('OTP not found or expired.');
    }

    // Check if the OTP is expired (e.g., 10 minutes)
    const isExpired =
      new Date() - new Date(otpRecord.createdAt) > 10 * 60 * 1000; // 10 minutes in milliseconds

    if (isExpired) {
      return res.status(400).json('OTP expired. Please request a new one.');
    }

    // Check if the OTP matches
    if (otpRecord.otp !== otp) {
      return res.status(400).json('Invalid OTP.');
    }

    // OTP is valid and not expired, allow user to reset the password
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

    // Encrypt the new password before saving
    const encryptedPassword = CryptoJS.AES.encrypt(
      newPassword,
      process.env.PASS_SEC
    ).toString();

    // Update the user's password
    user.password = encryptedPassword;
    await user.save();

    // Remove the OTP from the database (optional, depending on your use case)
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

// Use export default to match ES Module import
export default router;
