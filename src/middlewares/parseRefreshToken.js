import { expressjwt } from 'express-jwt'
import { Config } from '../config/index.js'

export default expressjwt({
    secret: Config.REFRESH_TOKEN_SECRET,
    algorithms: ['HS256'],
    getToken(req) {
        try {
            const { refreshToken } = req.cookies
            return refreshToken
        } catch (error) {
            new Error(error)
        }
    },
})
