import userModel from '../models/userModel.js'

export class UserService {
    async create({ name, email, password }) {
        const user = new userModel({ name, email, password })
        const data = await user.save()
        return data
    }
}
