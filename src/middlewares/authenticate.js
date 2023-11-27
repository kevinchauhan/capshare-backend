import { expressjwt } from 'express-jwt'
import { Config } from '../config/index.js'

export default expressjwt({
    secret: Config.ACCESS_TOKEN_SECRET,
    algorithms: ['HS256'],
    getToken(req) {
        try {
            const authHeader = req.headers.authorization
            if (authHeader && authHeader.split(' ')[1] !== 'undefined') {
                const token = authHeader.split(' ')[1]
                if (token) {
                    return token
                }
            }

            const { accessToken } = req.cookies
            return accessToken
        } catch (error) {
            new Error(error)
        }
    },
})
