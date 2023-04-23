const { body } = require('express-validator');

exports.blog = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('title is required'),
  body('body')
    .not()
    .isEmpty()
    .withMessage('body is required'),
  body('image')
    .not()
    .isEmpty()
    .withMessage('image is required')
];
