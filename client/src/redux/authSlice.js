import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../utils/axios.js'

const initialState  = {
	user: null,
	token: null,
	isLoading: false,
	status: null
}

export const registration = createAsyncThunk(
	'auth/registration',
	async ({username, password}) => {
		try {
			const {data} = await axios.post('/auth/register', {username, password})
			if(data.token) {
				window.localStorage.setItem('token', data.token)
			}
			return data
		} catch(err) {
			console.log('Ошибка в функции registration. Файл authSlice.js')
		}
	}
)

export const login = createAsyncThunk(
	'auth/login',
	async ({username, password}) => {
		try {
			const {data} = await axios.post('/auth/login', {username, password})
			if(data.token) {
				window.localStorage.setItem('token', data.token)
			}
			return data
		} catch(err) {
			console.log('Ошибка в функции login. Файл authSlice.js')
		}
	}
)

export const getMe = createAsyncThunk(
	'auth/getMe',
	async () => {
		const {data} = await axios.get('/auth/me')
		return await data
	}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logaut: (state) => {
			state.user = null
			state.token = null
			state.isLoading = false
			state.status = null
		}
	},
	extraReducers: {
		// Регистрация пользователя
		[registration.pending]: (state) => {
			state.isLoading = true
		},
		[registration.fulfilled]: (state, action) => {
			state.isLoading = false
			state.status = action.payload.message
			state.user = action.payload.user
			state.token = action.payload?.token
		},
		[registration.rejected]: (state, action) => {
			state.isLoading = true
			state.status = action.payload?.message
		},
		// Logi пользователя
		[login.pending]: (state) => {
			state.isLoading = true
		},
		[login.fulfilled]: (state, action) => {
			state.isLoading = false
			state.status = action.payload?.message
			state.user = action.payload?.user
			state.token = action.payload?.token
		},
		[login.rejected]: (state, action) => {
			state.isLoading = true
			state.status = action.payload?.message
		},
		// getMe
		[getMe.pending]: (state) => {
			state.isLoading = true
		},
		[getMe.fulfilled]: (state, action) => {
			state.isLoading = false
			state.status = null
			state.user = action.payload?.user
			state.token = action.payload?.token
		},
		[getMe.rejected]: (state, action) => {
			state.isLoading = true
			state.status = action.payload?.message
		},
	}
})

export const checkIsAuth = state => Boolean(state.auth.token)

export const {logaut} = authSlice.actions

export default authSlice.reducer