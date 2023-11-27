import { validationResult } from 'express-validator'
import refreshTokenModel from '../models/refreshTokenModel.js'

export class AuthController {
    constructor(userService, logger, tokenService) {
        this.userService = userService
        this.logger = logger
        this.tokenService = tokenService
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
            const accessToken = this.tokenService.generateAccessToken(payload)

            // persist refresh token
            const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365 //1y
            const newRefreshToken = refreshTokenModel({
                userId: user.id,
                expiresAt: new Date(Date.now() + MS_IN_YEAR),
            })
            const refreshData = await newRefreshToken.save()

            const refreshToken = this.tokenService.generateRefreshToken({
                ...payload,
                id: String(refreshData.id),
            })

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
            console.log(err)
            return next(err)
        }
    }
}
