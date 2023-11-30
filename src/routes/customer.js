import express from 'express'

const router = express.Router()

router.post('/register', (req, res, next) => {
    res.status(201).json({})
})

export default router
