import 'reflect-metadata'
import express from 'express'
import logger from './config/logger.js'
import errorHandler from './middlewares/errorHandler.js'
import router from './routes/auth.js'
const app = express()

// auth routes
app.use('/auth', router)

// error handler
app.use(errorHandler)

export default app
