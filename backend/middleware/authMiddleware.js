import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  console.log("Cookies: ", req.cookies);  // Log cookies
  console.log("Session: ", req.session);  // Log session data

  if (!req.session.user) {
    return res.status(401).json('Access denied. No user session found.');
  }

  req.user = req.session.user;  // Attach user data to the request object
  next();
};





// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();  // Proceed if user is admin
  } else {
    return res.status(403).json('You do not have permission to access this resource.');
  }
};

export { verifyToken, verifyAdmin };
