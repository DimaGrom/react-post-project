const axios = require('axios')

const checkUserDB = async (username) => {
	const request = await axios.get('http://localhost:5000/users')
	const response = await request.data
	const check = await response.findIndex(index => index.name === username)
	if(check === -1) {
		return false
	} else {
		return true
	}
} 

const saveUserDB = async (user) => {
	await axios.post('http://localhost:5000/users', user)
}

const chackNamePasswordDB = async (username, password) => {
	const request = await axios.get('http://localhost:5000/users')
	const response = await request.data
	const check = await response.findIndex(index => index.name === username && index._password === password)
	if(check === -1) {
		return false
	} else {
		return true
	}
}

const userdataDB = async (username, password) => {
	const request = await  axios.get('http://localhost:5000/users')
	const response = await request.data
	const user = await response.find(f => f.name === username && f._password === password)
	return await user
}

const findUserIdDB = async (id) => {
	const request = await axios.get('http://localhost:5000/users')
	const response = await request.data
	const user = await response.find(f => f.id === id)
	return await user
}

module.exports = {
	checkUserDB,
	saveUserDB,
	chackNamePasswordDB,
	userdataDB,
	findUserIdDB
}