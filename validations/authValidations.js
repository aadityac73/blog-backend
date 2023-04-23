const { body } = require('express-validator');
const { isSingleName, isValidMobileNumber } = require('../util/common');
const models = require('../models');
// const moment = require('moment');
// const { MIN_AGE, CANDIDATE } = require('../util/constants');

const checkName = (val, param) => {
  if (val.includes(' ')) {
    return Promise.reject(`White spaces are not allowed in ${param}`);
  } else if (!isSingleName(val)) {
    return Promise.reject(`Numeric characters are not allowed in ${param}`);
  }
  return true;
};

const checkPassword = (val) => {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%&-]).{8,}/;
  if (!re.test(val)) {
    return Promise.reject('please check password format');
  }
  return true;
};

exports.login = [
  body('username').not().isEmpty().withMessage('Username is required'),
  body('password').not().isEmpty().withMessage('Password is required').custom(checkPassword)
];

exports.register = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('please enter a valid email')
    .custom(async (val) => {
      const user = await models.User.findOne({ email: val });
      if (user) {
        return Promise.reject('user with given email is already exist!');
      }
      return true;
    }),

  body('mobileNumber')
    .not()
    .isEmpty()
    .withMessage('mobileNumber is required')
    .custom(async (val) => {
      if (!isValidMobileNumber(val)) {
        return Promise.reject('Please enter a valid mobileNumber');
      }
      const user = await models.User.findOne({ mobileNumber: val });
      if (user) {
        return Promise.reject('user with given mobileNumber is already exist!');
      }
      return true;
    }),

  body('password').not().isEmpty().withMessage('password is required').custom(checkPassword)
];

// exports.forgotPassword = [
//   body('email')
//     .not()
//     .isEmpty()
//     .withMessage('email is required')
//     .normalizeEmail()
//     .isEmail()
//     .withMessage('please enter a valid email')
// ];

// exports.resetPassword = [
//   body('token').not().isEmpty().withMessage('token is required'),
//   body('password').not().isEmpty().withMessage('password is required').custom(checkPassword),
//   body('confirmPassword')
//     .not()
//     .isEmpty()
//     .withMessage('confirmPassword is required')
//     .custom((val, { req }) => {
//       if (val === req.body.password) {
//         return true;
//       }
//       return Promise.reject('password and confirmPassword must be same');
//     })
// ];
