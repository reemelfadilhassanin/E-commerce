// auth.js (Updated for ESM syntax)
import express from 'express'; // Using `import` for express
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming this is in ES Module format as well

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json('All fields (username, email, password) are required.');
  }

  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
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

// Login route
// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json('Both email and password are required.');
    }
  
    try {
      const user = await User.findOne({ email }); // Check by email instead of user_name
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
  

// Use export default to match ES Module import
export default router;
