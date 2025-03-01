import jwt from 'jsonwebtoken';

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json('Access denied. No token provided.');
  }

  jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
    if (err) {
      return res.status(403).json('Invalid or expired token.');
    }
    req.user = decoded;  // Attach decoded info to the request object (user)
    next();
  });
};

// Middleware to check if the user is an admin
const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();  // Proceed to next middleware if user is admin
  } else {
    return res.status(403).json('You do not have permission to access this resource.');
  }
};

export { verifyToken, verifyAdmin };
