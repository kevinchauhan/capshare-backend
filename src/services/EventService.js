import eventModel from '../models/eventModel.js'

export class EventService {
    async create({ name, customerId, userId }) {
        const event = eventModel({ name, customerId, userId })
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
    async removeEvent(id, userId) {
        return await eventModel.deleteOne({ _id: id, userId })
    }
}
