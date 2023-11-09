import { body, checkSchema } from 'express-validator'

export default checkSchema({
    name: {
        errorMessage: 'name is required',
        notEmpty: true,
        trim: true,
    },
    email: {
        errorMessage: 'email is required',
        notEmpty: true,
        trim: true,
    },
})
