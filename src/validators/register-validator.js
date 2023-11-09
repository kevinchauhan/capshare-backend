import { body, checkSchema } from 'express-validator'

export default checkSchema({
    email: {
        errorMessage: 'email is required',
        notEmpty: true,
    },
})
