import express from 'express'
import errorHandler from './middlewares/errorHandler.js'
import router from './routes/auth.js'
import connectDb from './config/dbConnection.js'
import cookieParser from 'cookie-parser'
const app = express()

// connect db
connectDb()

app.use(express.json())
app.use(cookieParser())

// auth routes
app.use('/auth', router)

// error handler
app.use(errorHandler)

export default app
