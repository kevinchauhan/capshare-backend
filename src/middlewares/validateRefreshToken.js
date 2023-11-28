import { expressjwt } from 'express-jwt'
import { Config } from '../config/index.js'
import refreshTokenModel from '../models/refreshTokenModel.js'
import logger from '../config/logger.js'

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
    async isRevoked(request, token) {
        try {
            const refreshToken = await refreshTokenModel.findOne({
                _id: token.payload.id,
            })
            return refreshToken === null
        } catch (error) {
            logger.error('Error while getting the refresh token', {
                _id: token.payload.id,
            })
        }
        return true
    },
})
