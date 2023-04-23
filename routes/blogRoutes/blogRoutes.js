const route = require('express').Router();
const Blog = require('../../controllers/blogController/blogController')
const checkAuth = require('../../middleware/checkAuth')
const { wrapper } = require('../../util/errorWrap');
const validationError = require('../../middleware/validationError');
const blogValidation = require('../../validations/blogValidations')

route.post('/', blogValidation.blog, validationError, checkAuth, wrapper(Blog.createBlog))

route.get('/', wrapper(Blog.getAllBlogs))

route.get('/user', checkAuth, wrapper(Blog.getBlogsByUserId))

route.get('/:id', wrapper(Blog.getBlogById))

route.put('/:id', blogValidation.blog, validationError, checkAuth, wrapper(Blog.updateBlogById))

route.delete('/:id', checkAuth, wrapper(Blog.deleteBlogById))

module.exports = route