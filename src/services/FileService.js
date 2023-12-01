import createHttpError from 'http-errors'
import fileModel from '../models/fileModel.js'

export class FileService {
    async store(file) {
        try {
            const files = await fileModel.insertMany(file)
            return files
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store data in database',
            )
            throw new Error(error)
        }
    }
    async findAll(folderId) {
        try {
            const files = await fileModel.find()
            console.log(files)
            return files
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store data in database',
            )
            throw new Error(error)
        }
    }
}
