import eventModel from '../models/eventModel.js'

export class EventService {
    async create({ name, customerId, userId, accessCode }) {
        const event = eventModel({ name, customerId, userId, accessCode })
        const data = await event.save()
        return data
    }
    async findAll(id) {
        const events = await eventModel
            .find({ userId: id })
            .select('-updatedAt -__v -createdAt')
            .populate({
                path: 'customerId',
                select: '-updatedAt -__v -createdAt',
            })
        return events
    }
    async find(id) {
        const event = await eventModel
            .findOne({ _id: id })
            .select('-updatedAt -__v -createdAt')
        return event
    }
    async removeEvent(id, userId) {
        return await eventModel.deleteOne({ _id: id, userId })
    }
    async findByCode(code) {
        const event = await eventModel.findOne({ accessCode: code })
        return event
    }
}
