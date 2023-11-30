import express from 'express'
import CustomerController from '../controllers/CustomerController.js'

const router = express.Router()

const customerController = new CustomerController()
router.post('/register', (req, res, next) =>
    customerController.register(req, res, next),
)

export default router
