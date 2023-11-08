import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.js' // Import your Express app
import mongoose from 'mongoose'
import userModel from '../../src/models/userModel.js'
import connectDb from '../../src/config/dbConnection.js'

chai.use(chaiHttp)
const expect = chai.expect

let connection
before(async () => {
    connection = await connectDb()
})

beforeEach(async () => {
    await userModel.deleteMany({})
})

after(async () => {
    await userModel.deleteMany({})
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
            await userModel.create(userData)
            const users = await userModel.find()
            // Assert
            expect(users).length(1)
            expect(users[0].name).equal(userData.name)
            expect(users[0].email).equal(userData.email)
        })
    })

    describe('missing fields', () => {})
})
