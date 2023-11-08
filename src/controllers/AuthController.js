export class AuthController {
    constructor(userService) {
        this.userService = userService
    }

    async register(req, res) {
        const { name, email, password } = req.body
        try {
            const data = await this.userService.create({
                name,
                email,
                password,
            })
            res.status(201).json({ msg: 'registering...', data })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}
