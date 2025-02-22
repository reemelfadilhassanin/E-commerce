import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log('Received token:', token); // Log the token for debugging
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(403).json('Token is not valid!');
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json('You are not authenticated!');
  }
};


// Middleware to check if the user is authorized (based on user ID or admin role)
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log('Verifying user authorization:', req.user); // Log user info for debugging
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next(); // Proceed to the next middleware/route if authorized
    } else {
      res.status(403).json('You are not allowed to do that!');
    }
  });
};

// Middleware to check if the user is an admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log('Verifying admin rights:', req.user); // Log user info for debugging
    if (req.user.isAdmin) {
      next(); // Proceed to the next middleware/route if the user is an admin
    } else {
      res.status(403).json('You are not allowed to do that!');
    }
  });
};

// Export all middlewares
export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
