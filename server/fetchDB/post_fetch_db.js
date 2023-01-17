const axios = require('axios')

const savePostDB = async (params) => {
	const request = await axios.post('http://localhost:5000/posts', params)
}

const getPostDB = async () => {
	const request = await axios.get('http://localhost:5000/posts')
	const response = await request.data
	const posts = await response.sort((a, b) => b.datecreate - a.datecreate)
	return await posts
}

const getPostByIDDB = async (id) => {
	const request = await axios.get(`http://localhost:5000/posts/${id}`)
	const response = await request.data
	return await response
}

module.exports = {
	savePostDB,
	getPostDB,
	getPostByIDDB
}