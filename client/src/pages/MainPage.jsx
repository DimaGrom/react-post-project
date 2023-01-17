import React, {useEffect} from 'react'
import '../css/style.css'
import './mainPage.css'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getAllPost} from '../redux/post_slice.js'
import PostItem from '../components/PostItem.jsx'

const MainPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {posts, check} = useSelector(state => state.post)
	// const posts = null

	useEffect(() => {
		dispatch(getAllPost())
	}, [dispatch, check])

	// console.log('posts ', posts)

	const handleCreatePost = () => {
		navigate('/new')
	}

	if(!posts) {
		return (
			<div className='MainPage'>
				<h2>Постов нет</h2>
				<div className='addpost'>
					<button onClick={handleCreatePost}>Создать пост</button>
				</div>
			</div>	
		)
	}

	return (
		<div className='MainPage'>

			<div className="posts">
				{
					posts && posts.map((m, ind) => <PostItem key={ind} post={m} />)
				}

			</div> 

			<div className='popularposts'>POPYLARPOSTS</div>

		</div>
	)
}

export default MainPage