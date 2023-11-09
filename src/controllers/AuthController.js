export class AuthController {
    constructor(userService, logger) {
        this.userService = userService
        this.logger = logger
    }

    async register(req, res, next) {
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
            res.status(201).json({ msg: 'registering...', user, id: user.id })
        } catch (err) {
            return next(err)
        }
    }
}
