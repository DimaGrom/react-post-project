const {Router} = require('express')
const checkAuth = require('../utils/checkAuth.js')
const {
	createPost,
	getAllPost,
	getPostByID
} = require('../controllers/post_controller.js')

 
const router = new Router()


//http://localhost:3003/api/posts'
router.get('/', getAllPost)

//http://localhost:3003/api/posts'
router.post('/', checkAuth, createPost)

// Получение поста по id
router.get('/:id', getPostByID)

module.exports = router