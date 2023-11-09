import createHttpError from 'http-errors'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

export class UserService {
    async create({ name, email, password, studioname }) {
        const user = await userModel.findOne({ email })
        if (user) {
            const error = createHttpError(400, 'email is already exists')
            throw error
        }

        // Hash password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        try {
            const user = new userModel({
                name,
                email,
                password: hashedPassword,
                studioname,
            })
            const data = await user.save()
            return data
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store data in database',
            )
            console.log(err)
            throw new Error(error)
        }
    }
}
