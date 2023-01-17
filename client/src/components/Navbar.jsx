import react from 'react'
import '../css/style.css'
import './navbar.css'
import {NavLink, Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {checkIsAuth, logaut} from '../redux/authSlice.js'
import { toast } from 'react-toastify'

const Navbar = () => {
	const isAuth = useSelector(checkIsAuth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const isActiveStyle = {opacity: '1'}

	const handleLogaut = () => {
		dispatch(logaut())
		window.localStorage.removeItem('token')
		toast('Вы вышли из системы')
		navigate('/')
	}	

	return (
		<div className='Navbar'>
			<div>
				A
			</div>
			{
				isAuth 
					? (
						<div className='Navbar__item'>
							<NavLink 
								to='/' 
								style={({isActive}) => isActive ? isActiveStyle : undefined}
							>
								Посты
							</NavLink>
							<NavLink 
								to='/posts'
								style={({isActive}) => isActive ? isActiveStyle : undefined}
							>
								Мои посты
							</NavLink>
							<NavLink 
								to='/new'
								style={({isActive}) => isActive ? isActiveStyle : undefined}
							>
								Добавить посты
							</NavLink>
						</div>
					) : (
						<div className='Navbar__item'>
							<NavLink to='/'>Главная</NavLink>
						</div>
					)
			}	
			<div className='Navbar_login'>
				{
					isAuth
						?	<button onClick={handleLogaut}>Выйти</button>
						: <Link to='/login'>Войти</Link>
				}
			</div>
		</div>
	)
}

export default Navbar