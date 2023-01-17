import React, {useState} from 'react'
import '../css/style.css'
import './addpostPage.css'
import {createPost} from '../redux/post_slice.js'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const AddpostPage  = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [image, setimage] = useState('')
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')

	const handleSubmit = () => {
		const post = new FormData()
		post.append('image', image)
		post.append('title', title)
		post.append('text', text)
		dispatch(createPost(post))
		navigate('/')
	}

	return (
		<div className='AddpostPage'>
			<h1>Добавить пост</h1>
			<form  
				onSubmit={e => e.preventDefault()}
			>	
				<label className='file'>
					Прикрепить изображение
					<input
						type='file'
						className='hidden'
						onChange={e => setimage(e.target.files[0])}
					/>
				</label>
				<div className='image'>
					{
						image && <img src={URL.createObjectURL(image)} alt='картинка' />
					}
				</div>
				<div className='context'>
					<label>
						Заголовок поста:
						<input
							type='text'
							value={title}
							onChange={e => setTitle(e.target.value)}
							placeholder='Заголовок...'
						/>
					</label>
					<label>
						Текст поста:
						<textarea
							rows='5'
							type='text'
							value={text}
							onChange={e => setText(e.target.value)}
							placeholder='Текст...'
						/>
					</label>
				</div>
				<div>
					<button onClick={handleSubmit} className='submit'>Добавить</button>
				</div>
			</form>
		</div>
	)
}

export default AddpostPage