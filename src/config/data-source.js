import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../entity/User'
import { Config } from './index.js'

export const AppDataSource = new DataSource({
    type: 'mongodb',
    port: Config.DB_PORT,
    host: Config.DB_HOST,
    database: Config.DB_NAME,
    // NEVER USE IN PRODUCTION
    synchronize: Config.NODE_ENV === 'test' || Config.NODE_ENV === 'dev',
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
