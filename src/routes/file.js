import express from 'express'
import FileController from '../controllers/FileController.js'
import authenticate from '../middlewares/authenticate.js'
import { FileService } from '../services/FileService.js'
const router = express.Router()

const fileService = new FileService()
const fileController = new FileController(fileService)
router.post('/register/:id', authenticate, (req, res, next) =>
    fileController.store(req, res, next),
)
router.get('/:folderid', (req, res, next) =>
    fileController.findAll(req, res, next),
)

// router.delete('/', authenticate, (req, res, next) => {
//     folderController.remove(req, res, next)
// })

export default router
