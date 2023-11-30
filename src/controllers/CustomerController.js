export default class CustomerController {
    constructor(customerService) {
        this.customerService = customerService
    }
    async register(req, res, next) {
        const { name, mobile } = req.body
        try {
            const customer = await this.customerService.create({
                name,
                mobile,
                userId: req.auth.sub,
            })
            res.status(201).json({
                id: customer.id,
                name: customer.name,
                mobile: customer.mobile,
            })
        } catch (error) {
            return next(error)
        }
    }
    async find(req, res, next) {
        try {
            const customers = await this.customerService.find(req.auth.sub)
            res.json({ customers })
        } catch (error) {
            return next(error)
        }
    }
}
