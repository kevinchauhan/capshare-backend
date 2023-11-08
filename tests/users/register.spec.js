import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.js' // Import your Express app
import mongoose from 'mongoose'
import userSchema from '../../src/models/userSchema.js'
import connectDb from '../../src/config/dbConnection.js'

chai.use(chaiHttp)
const expect = chai.expect

let connection
before(async () => {
    connection = await connectDb()
})

beforeEach(async () => {
    await userSchema.deleteMany({})
})

after(async () => {
    await userSchema.deleteMany({})
    mongoose.connection.close()
})

describe('POST /auth/register', () => {
    describe('given all fields', () => {
        it('should return 201 status code', async () => {
            // Arrange
            const userData = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '123',
            }
            // Act
            const response = await chai
                .request(app)
                .post('/auth/register')
                .send(userData)
            // Assert
            expect(response).to.have.status(201)
        })

        it('should valid json response', async () => {
            // Arrange
            const userData = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '123',
            }
            // Act
            const response = await chai
                .request(app)
                .post('/auth/register')
                .send(userData)
            // Assert
            expect(response).to.be.json
        })

        it('should persist the use in the database', async () => {
            // Arrange
            const userData = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '123',
            }
            // Act
            await userSchema.create(userData)
            const users = await userSchema.find()
            // Assert
            expect(users).length(1)
        })
    })

    describe('missing fields', () => {})
})
