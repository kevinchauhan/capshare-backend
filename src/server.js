import app from './app.js'
import { Config } from './config/index.js'

const startServer = async () => {
    const PORT = Config.PORT
    try {
        app.listen(PORT, () => {
            // eslint-disable-next-line
            console.log('listening on PORT', PORT)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
startServer()
