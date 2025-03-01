import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';  // Import the middleware

const router = express.Router();

// Admin Route: Accessible only by admins
router.get('/admin', verifyToken, verifyAdmin, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the admin dashboard!',
    user: req.user,  // Send user data (including admin status)
  });
});

export default router;
