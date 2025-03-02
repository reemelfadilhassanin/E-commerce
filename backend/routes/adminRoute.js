import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js'; // Import the middleware

const router = express.Router();

// Ensure that this route is properly defined and matches the path you are trying to access
router.get('/', verifyToken, verifyAdmin, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the admin dashboard!',
    user: req.user, // This should contain the authenticated user info
  });
});

export default router;
