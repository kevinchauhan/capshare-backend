import eventModel from '../models/eventModel.js'

export class EventService {
    async create({ name, customerId, userId }) {
        const event = eventModel({ name, customerId, userId })
        const data = await event.save()
        return data
    }
    async findAll(id) {
        const events = eventModel.find({ userId: id })
        const data = await events.save()
        return data
    }
}
