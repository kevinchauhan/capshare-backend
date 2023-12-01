import express from 'express'
import FileController from '../controllers/FileController.js'
import authenticate from '../middlewares/authenticate.js'
const router = express.Router()

const fileController = new FileController()
router.post('/register/:id', authenticate, (req, res, next) =>
    fileController.register(req, res, next),
)

// router.get('/:id', authenticate, (req, res, next) =>
//     folderController.findAll(req, res, next),
// )

// router.delete('/', authenticate, (req, res, next) => {
//     folderController.remove(req, res, next)
// })

export default router
