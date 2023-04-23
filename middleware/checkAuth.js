const models = require('../models');
const jwt = require('jsonwebtoken');
const envVars = require('../config/envVars');

const checkAuth = async (req, res, next) => {
  console.log('from checkauth');
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'auth failed' });
  }
  try {
    const checkToken = await models.UserLogger.findOne({ token });
    if (!checkToken) {
      return res.status(401).json({ message: 'auth failed' });
    }
    const decoded = jwt.verify(token, envVars.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    await models.UserLogger.remove({ token });
    return res.status(401).json({ message: 'auth failed' });
  }
};

module.exports = checkAuth;
