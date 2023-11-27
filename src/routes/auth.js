import express from 'express'
import { AuthController } from '../controllers/AuthController.js'
import registerValidator from '../validators/register-validator.js'
import logger from '../config/logger.js'
import { UserService } from '../services/UserService.js'
import { TokenService } from '../services/TokenService.js'

const router = express.Router()

const userService = new UserService()
const tokenService = new TokenService()
const authController = new AuthController(userService, logger, tokenService) //passing dependency injection

router.post('/register', registerValidator, (req, res, next) =>
    authController.register(req, res, next),
)

export default router
