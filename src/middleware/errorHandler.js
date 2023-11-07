import logger from '../config/logger.js'

// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
    logger.error(err.message)
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: '',
                location: '',
            },
        ],
    })
}

export default errorHandler
