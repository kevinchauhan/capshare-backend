import express from 'express'
import CustomerController from '../controllers/CustomerController.js'
import authenticate from '../middlewares/authenticate.js'
import { CustomerService } from '../services/CustomerService.js'

const router = express.Router()

const customerService = new CustomerService()
const customerController = new CustomerController(customerService)

router.post('/register', authenticate, (req, res, next) =>
    customerController.register(req, res, next),
)

router.get('/', authenticate, (req, res, next) =>
    customerController.find(req, res, next),
)

router.delete('/', authenticate, (req, res, next) =>
    customerController.remove(req, res, next),
)

router.put('/update', authenticate, (req, res, next) =>
    customerController.update(req, res, next),
)

export default router
