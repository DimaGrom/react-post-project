import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../utils/axios.js'

const initialState = {
	posts: [],
	post: [],
	myposts: [],
	popularposts: [],
	statuse: null,
	isLoading: false,
	check: false
}

// Создание нового поста
export const createPost = createAsyncThunk(
	'post/createPost',
	async (params) => {
		const {data} = await axios.post('/posts', params)
		console.log('data ', data)
		return await data
	}
)

// Получение всех постов
export const getAllPost = createAsyncThunk(
	'post/getAllPost',
	async () => {
		const {data} = await axios.get('/posts')
		return await data
	}
)

// Получение поста по id
export const getPost = createAsyncThunk(
	'post/getPost',
	async (id) => {
		const {data} = await axios.get(`/posts/${id}`)
		console.log(data)
		return await data
	}
)

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: {
		// Создание нового поста
		[createPost.pandig]: (state, action) => {
			state.isLoading = true
			state.statuse = action.payload?.message
		},
		[createPost.fulfilled]: (state, action) => {
			state.isLoading = false
			//state.posts = action.payload?.posts
			state.posts = [...state.posts, action.payload?.post]
			state.statuse = action.payload?.message
			state.check = !state.check
		},
		[createPost.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
		// Получение всех постов
		[getAllPost.pandig]: (state, action) => {
			state.isLoading = true
			state.statuse = action.payload?.message
		},
		[getAllPost.fulfilled]: (state, action) => {
			state.isLoading = false
			state.posts = action.payload?.posts
			state.statuse = action.payload?.message
		},
		[getAllPost.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
		// Получение поста по id
		[getPost.pendig]: (state) => {
			state.isLoading = true
		},
		[getPost.fulfilled]: (state, action) => {
			state.isLoading = false
			state.post = action.payload
		},
		[getPost.rejected]: (state) => {
			state.isLoading = true
		},
	}
})

export default postSlice.reducer