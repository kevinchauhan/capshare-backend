import createHttpError from 'http-errors'
import userModel from '../models/userModel.js'

export class UserService {
    async create({ name, email, password }) {
        try {
            const user = new userModel({ name, email, password })
            const data = await user.save()
            return data
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store data in database',
            )
            throw new error()
        }
    }
}
