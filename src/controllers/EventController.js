export default class EventController {
    constructor(eventService) {
        this.eventService = eventService
    }
    async register(req, res, next) {
        try {
            const { name, customerId } = req.body
            const event = await this.eventService.create({
                name,
                customerId,
                userId: req.auth.sub,
            })
            res.status(201).json({
                id: event._id,
                name: event.name,
                customerId: event.customerId,
            })
        } catch (error) {
            return next()
        }
    }
    async findAll(req, res, next) {
        try {
            const events = await this.eventService.findAll(req.auth.sub)
            res.status(200).json(events)
        } catch (error) {
            return next()
        }
    }
    async remove(req, res, next) {
        try {
            const events = await this.eventService.removeEvent(
                req.body.id,
                req.auth.sub,
            )
            res.status(200).json(events)
        } catch (error) {
            return next()
        }
    }
}
