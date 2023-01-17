import React, {useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {getMe} from './redux/authSlice.js'
import Layout from './components/Layout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import AddpostPage from './pages/AddpostPage.jsx'
import MainPage from './pages/MainPage.jsx'
import PostPage from './pages/PostPage.jsx'


const App = () => {		
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMe())
	}, [dispatch])

	return (
		<Layout>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/registration' element={<RegistrationPage />} />
				<Route path='/new' element={<AddpostPage />} />
				<Route path='/:id' element={<PostPage />} />
			</Routes>
			<ToastContainer position='bottom-right' />
		</Layout>
	)

}

export default App