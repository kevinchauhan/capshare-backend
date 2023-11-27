import express from 'express'
import { AuthController } from '../controllers/AuthController.js'
import registerValidator from '../validators/register-validator.js'
import logger from '../config/logger.js'
import { UserService } from '../services/UserService.js'
import { TokenService } from '../services/TokenService.js'
import loginValidator from '../validators/login-validator.js'
import { CredentialService } from '../services/CredentialService.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

const userService = new UserService()
const tokenService = new TokenService()
const credentialService = new CredentialService()
const authController = new AuthController(
    userService,
    logger,
    tokenService,
    credentialService,
) //passing dependency injection

router.post('/register', registerValidator, (req, res, next) =>
    authController.register(req, res, next),
)

router.post('/login', loginValidator, (req, res, next) =>
    authController.login(req, res, next),
)

router.get('/self', authenticate, (req, res, next) =>
    authController.self(req, res, next),
)

export default router
