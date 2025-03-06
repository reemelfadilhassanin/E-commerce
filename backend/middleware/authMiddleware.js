const verifyToken = (req, res, next) => {
  console.log('Cookies in backend auth:', req.cookies);  // Check cookies
  console.log('Session Data:', req.session);  // Check session data

  if (!req.session.user) {
    return res.status(401).json('Access denied. No user session found.');
  }

  req.user = req.session.user;
  next();
};


// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next(); // Proceed if the user is an admin
  } else {
    return res.status(403).json('You do not have permission to access this resource.');
  }
};

export { verifyToken, verifyAdmin };
