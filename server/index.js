const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')

const authRouter = require('./routers/auth_router.js')
const postRouter = require('./routers/post_router.js')

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3003

// Middleware
app.use(cors())
app.use(express.json())
app.use(fileUpload({
	createParentPath: true
}))
app.use(express.static('uploads'))


//Routers
//http://localhost:3003/api/auth'
app.use('/api/auth', authRouter)
//http://localhost:3003/api/posts'
app.use('/api/posts', postRouter)


app.listen(PORT, () => console.log(`Серверз запущен на localhost:${PORT}`))

// http://localhost:3003