import customerModel from '../models/customerModel.js'

export default class CustomerController {
    async register(req, res, next) {
        const { name, mobile } = req.body
        const customer = new customerModel({
            name,
            mobile,
        })
        const data = await customer.save()
        res.status(201).json(data)
    }
}
