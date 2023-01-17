import React, {useState, useEffect} from 'react'
import '../css/style.css'
import './registrationPage.css'
import {NavLink, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {registration, checkIsAuth} from '../redux/authSlice.js'
import { toast } from 'react-toastify'

const RegistrationPage  = () => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const isAuth = useSelector(checkIsAuth)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {status} = useSelector(state => state.auth)

	useEffect(() => {
		if(status) {
			toast(status)
		}
		if(isAuth) {
			navigate('/')
		}
	}, [status, navigate, isAuth])

	const handleSubmit = () => {
			dispatch(registration({username, password}))
	}

	return (
		<div className='RegistrationPage'>
			<h1>Регистрация</h1>
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
					<button onClick={handleSubmit}>Зарегистрироваться</button>
					<NavLink to='/login'>Login</NavLink>
				</div>
			</form>
		</div>
	)
}

export default RegistrationPage