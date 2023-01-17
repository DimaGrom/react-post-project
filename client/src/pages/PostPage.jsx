import React, {useEffect} from 'react'
import '../css/style.css'
import './postPage.css'
import {getPost} from '../redux/post_slice.js'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

const PostPage = () => {
	const params = useParams()
	const dispatch = useDispatch()

	const {post} = useSelector(state => state.post)

	useEffect(() => {
		dispatch(getPost(params.id))
	}, [dispatch, params.id])

	if(!post) {
		return (
			<div className='MainPage'>
				<h2>Пост загружается</h2>
			</div>
		)
	}


	return (
		<div className='PostPage'>
			<div className='PostPage__container'>

				<div className='PostPage__contant'>
					<div>
						{
							post.imageURL && <img src={`http://localhost:3003/${post.imageURL}`} alt='картинка' />
						}		
					</div>
				</div>

				<div className='PostPage__comment'>
					COMMENT
				</div>
				
			</div>
		</div>
	)
}

export default PostPage