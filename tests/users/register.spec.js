import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.js' // Import your Express app
import mongoose from 'mongoose'
import userModel from '../../src/models/userModel.js'
import connectDb from '../../src/config/dbConnection.js'
import Roles from '../../src/constants/index.js'

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
    // await userModel.deleteMany({})
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
                studioname: 'photo',
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
                studioname: 'photo',
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
                studioname: 'photo',
            }
            // Act
            await userModel.create(userData)
            const users = await userModel.find()
            // Assert
            expect(users).length(1)
            expect(users[0].name).equal(userData.name)
            expect(users[0].email).equal(userData.email)
        })

        it.skip('should return id of created user', async () => {
            // Arrange
            const userData = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '123',
                studioname: 'photo',
            }
            // Act
            const response = await chai
                .request(app)
                .post('/auth/register')
                .send(userData)
            // Assert
            expect(response.body).to.have.property('id')
        })

        it('should store a role in database', async () => {
            // Arrange
            const userData = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '123',
                studioname: 'photo',
            }
            // Act
            const response = await chai
                .request(app)
                .post('/auth/register')
                .send(userData)
            const users = await userModel.find()
            // Assert
            expect(users[0]).to.have.property('role')
            expect(users[0].role).equal(Roles.USER)
        })
    })

    describe('missing fields', () => {})
})
