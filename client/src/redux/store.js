import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import postSlice from './post_slice.js'

const store = configureStore({
	reducer: {
		auth: authSlice,
		post: postSlice
	}
})

export default store