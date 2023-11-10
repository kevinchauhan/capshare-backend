import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { Config } from '../config/index.js'

export class AuthController {
    constructor(userService, logger) {
        this.userService = userService
        this.logger = logger
    }

    async register(req, res, next) {
        // validation
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }

        const { name, email, password, studioname } = req.body
        this.logger.debug('new request to register user', {
            name,
            email,
            password: '****',
        })
        try {
            const user = await this.userService.create({
                name,
                email,
                password,
                studioname,
            })
            this.logger.info('user has been created', { id: user.id })

            const payload = {
                sub: user.id,
            }
            const accessToken = jwt.sign(payload, Config.ACCESS_TOKEN_SECRET, {
                algorithm: 'HS256',
                expiresIn: '1h',
            })
            const refreshToken = jwt.sign(
                payload,
                Config.REFRESH_TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: '1y' },
            )

            res.cookie('accessToken', accessToken, {
                domain: 'localhost',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60, // 1hr
                httpOnly: true, // very important
            })
            res.cookie('refreshToken', refreshToken, {
                domain: 'localhost',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
                httpOnly: true, // very important
            })

            res.status(201).json({ user, id: user.id })
        } catch (err) {
            return next(err)
        }
    }
}
