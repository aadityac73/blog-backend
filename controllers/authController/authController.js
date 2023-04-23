const models = require('../../models');
const jwt = require('jsonwebtoken');
const envVars = require('../../config/envVars');
const bcrypt = require('bcrypt');
const moment = require('moment');

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await models.User.findOne({
    $or: [{ email: username }, { mobileNumber: username }]
  }).select('+password');

  if (!user) {
    return res.status(401).json({ message: 'auth failed' });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: 'auth failed' });
  }

  const userData = {
    id: user._id,
    email: user.email,
    mobileNumber: user.mobileNumber,
    firstName: user.firstName,
    lastName: user.lastName
  };

  const expiresAt = moment().add(envVars.JWT_EXPIRY, 'hours');

  const token = jwt.sign(userData, envVars.JWT_SECRET, {
    expiresIn: `${envVars.JWT_EXPIRY}h`
  });

  await models.UserLogger.create({ userId: userData.id, token, expiresAt });

  return res.json({
    token,
    expiresAt: moment(expiresAt).format('YYYY-MM-DDTHH:mm:ss'),
    ...userData
  });
};

const logout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  await models.UserLogger.deleteOne({ token });
  return res.status(200).json({ message: 'Successfully logged out!' });
};

const register = async (req, res) => {
  const { firstName, lastName, email, mobileNumber, password } = req.body;

  await models.User.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    password
  });

  return res.status(200).json({ message: 'Successfully registered!' });
};

module.exports = { login, logout, register };
