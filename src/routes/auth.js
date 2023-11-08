import express from 'express'
import { AuthController } from '../controllers/AuthController.js'
import { UserService } from '../services/UserService.js'
import logger from '../config/logger.js'

const router = express.Router()
const userService = new UserService()
const authController = new AuthController(userService, logger) //passing dependency injection

router.post('/register', (req, res, next) =>
    authController.register(req, res, next),
)

export default router
