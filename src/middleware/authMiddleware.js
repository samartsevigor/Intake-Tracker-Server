const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../constants/constants');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({message: 'Unauthorized: No token provided'});
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Unauthorized: Invalid token'});
  }
};

module.exports = authMiddleware;
