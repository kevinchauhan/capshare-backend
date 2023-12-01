import mongoose from 'mongoose'
const Schema = mongoose.Schema

const fileSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        originalname: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
        },
        path: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customer', // Reference to the customer model
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event', // Reference to the event model
        },
        folderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'folder', // Reference to the event model
        },
    },
    { timestamps: true },
)

export default mongoose.model('file', fileSchema)
