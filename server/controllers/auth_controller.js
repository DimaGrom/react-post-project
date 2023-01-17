const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uniqid = require('uniqid')
const {
	checkUserDB,
	saveUserDB,
	chackNamePasswordDB,
	userdataDB,
	findUserIdDB
} = require('../fetchDB/auth_fatch_db.js')

const register = async (req, res) => {
	try {
		const {username, password}  = req.body
		if(username === '' && password === '') {
			return res.send({message: 'Имя и пароль должны быть заполнены.'})
		}
		const userUse = await checkUserDB(username)
		if(userUse) {
			return res.send({message: 'Данное имя используется другим польователем. Поробуйте другое имя.'})
		}
		// хешуруем пароль
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)
		const newUser = {
			id: uniqid(),
			name: username,
			password: hash,
			_password: password,
			createtAt: new Date(),
			updatedAt: Date.now()
		}
		await saveUserDB(newUser)
		const token = jwt.sign(
			{
				id: newUser.id
			}, 
			process.env.JWT_SECRIT,
			{expiresIn: '30d'}
		)
		res.json({
			user: newUser,
			token,
			message: 'Регистрация прошла успешно!'
		})
	} catch(err) {
		res.send({message: 'В функции register, что-то пошло не так! Файл auth_controller'})
		console.log(err)
	}
}

const login = async (req, res) => {
	try {
		const {username, password} = req.body
		const chack = await chackNamePasswordDB(username, password)
		if(!chack) {
			return res.send({message: 'Неверное имя или пароль.'})
		}
		const user = await userdataDB(username, password)
		const token = jwt.sign(
			{
				id: user.id
			}, 
			process.env.JWT_SECRIT,
			{expiresIn: '30d'}
		)
		res.send({
			message: `${user.name}, добро пожаловать!`, 
			token,
			user
		})
	} catch(err) {
		res.send({message: 'В функции login, что-то пошло не так! Файл auth_controller'})
		console.log(err)
	}
}

const getMe = async (req, res) => {
	try {
		const user = await findUserIdDB(req.userID)
		if(!user) {
			return res.json({message: 'Доступа нет'})
		}
		const token = jwt.sign(
			{
				id: user.id
			},
			process.env.JWT_SECRIT,
			{expiresIn: '30d'}
		)
		res.send({user, token})
	} catch(err) {
		res.send({message: 'В функции getMe, что-то пошло не так! Файл auth_controller'})
		console.log(err)
	}
}

module.exports = {
	register,
	login,
	getMe
}