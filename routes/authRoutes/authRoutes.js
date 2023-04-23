const router = require('express').Router();
const Auth = require('../../controllers/authController/authController');
const checkAuth = require('../../middleware/checkAuth');
const validationError = require('../../middleware/validationError');
const Validation = require('../../validations/authValidations');
const { wrapper } = require('../../util/errorWrap');

router.post('/login', Validation.login, validationError, wrapper(Auth.login));
router.post('/logout', checkAuth, wrapper(Auth.logout));
router.post('/register', Validation.register, validationError, wrapper(Auth.register));

module.exports = router;
