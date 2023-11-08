import express from 'express'
import { AuthController } from '../controllers/AuthController.js'
import { UserService } from '../services/UserService.js'

const router = express.Router()
const userService = new UserService()
const authController = new AuthController(userService) //passing dependency injection

router.post('/register', (req, res) => authController.register(req, res))

export default router
