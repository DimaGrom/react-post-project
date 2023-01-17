import React from 'react'
import '../css/style.css'
import './postItem.css'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'

const PostItem  = ({post}) => {

	// console.log(post)

	if(!post) {return <></>}

	return (
		<div className='PostItem'>

			<Link to={`/${post.id}`}>
				<div className='image'>
					{
						post.imageURL && <img src={`http://localhost:3003/${post.imageURL}`} alt='Рисунок' />
					}
				</div>
			</Link>
			
			<div className='name'>
				<div>{post.userName}</div>	
				<Moment 
					date={post.datedate} 
					format='DD MM YYYY' 
					className='date'
				/>		
			</div>

			<div className='title'>{post.title}</div>
			<div className='text line-clamp-3'>{post.text}</div>

			<div className='rewies'>
				<div>
					<div className='mr-20'>Просмотров {post.views}</div>
					<div>COMMENT{post.comments}</div>
				</div>
				<div>
					<div className='mr-20'>РЕДАКТ</div>
					<div>DELET</div>
				</div>
			</div>

		</div>
	)
}

export default PostItem