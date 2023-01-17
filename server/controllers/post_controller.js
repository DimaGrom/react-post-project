const path = require('path')
const uniqid = require('uniqid')
const {findUserIdDB} = require('../fetchDB/auth_fatch_db.js')
const {
	savePostDB,
	getPostDB,
	getPostByIDDB
} = require('../fetchDB/post_fetch_db.js')


const createPost = async (req, res) => {
	try {
		const {title, text} = req.body

		const user = await findUserIdDB(req.userID)

		if(req.files) {
			const image = req.files.image
			const fileName = encodeURI(Date.now() + '.' + image.name)
			
			const newPostWithImage = {
				userName: user.name,
				id: uniqid(),
				title,
				text,
				views: 0,
				imageURL: fileName,
				author: req.userID,
				comments: 0,
				datecreate: Date.now(),
				datedate: new Date()
			}

			await savePostDB(newPostWithImage)

			image.mv(path.join('./uploads/' + fileName))

			return res.send({
				message: 'Привет!',
				post: newPostWithImage
			})
		}

		const newPostWithoutImage = {
			userName: user.name,
			id: uniqid(),
			title,
			text,
			views: 0,
			imageURL: '',
			author: req.userID,
			comments: 0,
			datecreate: Date.now(),
			datedate: new Date()
		}

		await savePostDB(newPostWithoutImage)

		return res.send({
			messge: 'Привет!',
			post: newPostWithoutImage
		})
	} catch(err) {
		res.send({message: 'В функции createPost, что-то пошло не так! Файл post_controller'})
		console.log(err)
	}
}

const getAllPost  = async (req, res) => {
	try {
		const posts = await getPostDB()
		res.send({
			message: 'Все посты.',
			posts
		})
	} catch(err) {
		res.send({message: 'В функции getAllPost, что-то пошло не так! Файл post_controller'})
		console.log(err)
	}
} 

const getPostByID = async (req, res) => {
	try {
		const post = await getPostByIDDB(req.params.id)
		console.log('post ', post)
		res.send(post)
	} catch(err) {
		res.send({message: 'В функции getPodyByID, что-то пошло не так! Файл post_controller'})

	}
}

module.exports = {
	createPost,
	getAllPost,
	getPostByID
}