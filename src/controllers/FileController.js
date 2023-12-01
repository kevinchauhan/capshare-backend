import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { id } = req.params
        const uploadPath = `uploads/${id}`
        // Check if the directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.originalname)
    },
})
const handleMultiPartData = multer({ storage }).array('logo')

export default class FileController {
    async register(req, res, next) {
        // multipart form data
        handleMultiPartData(req, res, async (err) => {
            if (err) {
                return next(err)
            }
            res.status(201).json({ data: req.files })
            // validation
            // const { error } = productSchema.validate(req.body)
            // if (error) {
            //     // if validation failed then delete uploaded file
            //     fs.unlink(`${appRoot}/${filePath}`, (err) => {
            //         if (err) {
            //             return next(CustomErrorHandler.serverError(err.message))
            //         }
            //     })
            //     return next(error)
            // }

            // const { name, price, size } = req.body
        })
    }
}
