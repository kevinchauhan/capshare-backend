import express from 'express'
import EventController from '../controllers/EventController.js'
import { EventService } from '../services/EventService.js'
import authenticate from '../middlewares/authenticate.js'
const router = express.Router()

const eventService = new EventService()
const eventController = new EventController(eventService)

router.post('/register', authenticate, (req, res, next) =>
    eventController.register(req, res, next),
)

router.get('/', authenticate, (req, res, next) =>
    eventController.findAll(req, res, next),
)

router.get('/:id', authenticate, (req, res, next) =>
    eventController.find(req, res, next),
)

router.delete('/', authenticate, (req, res, next) => {
    eventController.remove(req, res, next)
})

export default router
