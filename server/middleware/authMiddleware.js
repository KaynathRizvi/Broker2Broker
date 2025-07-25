const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Your existing protect function
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // This will have userId
    next();
  });
};

// New function for subscription routes (same as protect, just different name)
const authenticateToken = protect;

module.exports = { 
  protect,           // For your existing routes
  authenticateToken  // For subscription routes
};