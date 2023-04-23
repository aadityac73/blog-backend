const route = require('express').Router()
const user = require('../../controllers/userController/userController')
const checkAuth = require('../../middleware/checkAuth');
const { wrapper } = require('../../util/errorWrap');

route.get('/', checkAuth, wrapper(user.getUser))

module.exports = route