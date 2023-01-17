import React from 'react'
import '../css/style.css'

import Navbar from './Navbar.jsx'

const Layout = ({children}) => {

	return (
		<React.Fragment>
			<div className='base'>
				<div className='container'>
					<Navbar />
					{children}
				</div>
			</div>
		</React.Fragment>
	)
}

export default Layout