import jwt from 'jsonwebtoken'
import { Config } from '../config/index.js'

export class TokenService {
    generateAccessToken(payload) {
        const accessToken = jwt.sign(payload, Config.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1h',
        })
        return accessToken
    }

    generateRefreshToken(payload) {
        const refreshToken = jwt.sign(payload, Config.REFRESH_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1y',
            jwtid: String(payload.id),
        })
        return refreshToken
    }
}
