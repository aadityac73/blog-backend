const router = require('express').Router()

const userRoutes = require('./userRoutes/userRoutes')
router.use('/user', userRoutes)

const authRoutes = require('./authRoutes/authRoutes')
router.use('/auth', authRoutes)

const blogRoutes = require('./blogRoutes/blogRoutes')
router.use('/blog', blogRoutes)

module.exports = router;