import express from 'express'
import errorHandler from './middlewares/errorHandler.js'
import router from './routes/index.js'
import connectDb from './config/dbConnection.js'
import cookieParser from 'cookie-parser'
const app = express()

// connect db
connectDb()

app.use(express.json())
app.use(cookieParser())
// auth routes
app.use('/auth', router.auth)
// customer routes
app.use('/customer', router.customer)
// event routes
app.use('/event', router.event)
// folder routes
app.use('/folder', router.folder)
// file routes
app.use('/file', router.file)

// error handler
app.use(errorHandler)

export default app
