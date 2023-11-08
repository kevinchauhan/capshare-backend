export class AuthController {
    async register(req, res) {
        const { name } = req.body
        res.status(201).json({ msg: 'registering...' })
    }
}
