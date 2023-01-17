const {Router} = require('express')
const {
	register,
	login,
	getMe
} = require('../controllers/auth_controller.js')
const checkAuth = require('../utils/checkAuth.js')

const router = new Router()

// Register
//http://localhost:3002/api/auth/register
router.post('/register', register)

//http://localhost:3002/api/auth/register
router.post('/login', login)

//http://localhost:3002/api/auth/me
router.get('/me',checkAuth, getMe)

module.exports = router