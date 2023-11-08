import mongoose from 'mongoose'
import { Config } from './index.js'

const connectDb = async () => {
    const url = Config.DB_URL
    try {
        const connect = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        })
        const connection = mongoose.connection
        console.log('Database connected...', connect.connection.name)
        return connection
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDb
