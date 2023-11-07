import express from 'express'
import logger from './config/logger.js'
import errorHandler from './middleware/errorHandler.js'
const app = express()

app.get('/', (req, res) => {
    res.send('hello...')
})

app.use(errorHandler)

export default app
