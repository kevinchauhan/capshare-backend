import express from 'express'
import errorHandler from './middlewares/errorHandler.js'
import router from './routes/auth.js'
const app = express()

app.use(express.json())

// auth routes
app.use('/auth', router)

// error handler
app.use(errorHandler)

export default app
