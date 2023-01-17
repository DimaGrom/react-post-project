import React, {useState, useEffect} from 'react'
import '../css/style.css'
import './loginPage.css'
import {NavLink, useNavigate} from 'react-router-dom'
import {login, checkIsAuth} from '../redux/authSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'


const LoginPage  = () => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const {status} = useSelector(state => state.auth)
	const navigate = useNavigate()
	const isAuth = useSelector(checkIsAuth)

	useEffect(() => {
		if(status) {
			toast(status)
		}
		if(isAuth) {
			navigate('/')
		}
	}, [status, navigate, isAuth])

	const handleSubmit = () => {
		dispatch(login({username, password}))
	}

	return (
		<div className='LoginPage'>
			<h1>Авторизация</h1>
			<form onSubmit={e => e.preventDefault()}>
				<label>
					Имя:
					<input 
						type='text'
						placeholder='Username'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Пароль:
					<input 
						type='password'
						placeholder='Username'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</label>
				<div className='login'>
					<button onClick={handleSubmit}>Войти</button>
					<NavLink to='/registration'>Нет акаунта?</NavLink>
				</div>
			</form>
		</div>
	)
}

export default LoginPage