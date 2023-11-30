import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.js'
import mongoose from 'mongoose'
import customerModel from '../../src/models/customerModel.js'
import connectDb from '../../src/config/dbConnection.js'

chai.use(chaiHttp)
const expect = chai.expect

let connection
before(async () => {
    connection = await connectDb()
})

beforeEach(async () => {
    await customerModel.deleteMany({})
})

after(async () => {
    mongoose.connection.close()
})

describe('POST /customer/register', () => {
    describe('-> Given all fields', () => {
        it('should return 201 status code', async () => {
            // Arrange
            const userData = {
                name: 'customer1',
                mobile: '1234567898',
            }
            // Act
            const response = await chai
                .request(app)
                .post('/customer/register')
                .send(userData)
            // Assert
            expect(response).status(201)
            expect(response).to.be.json
        })
        it('should persist the user in the database', async () => {
            // Arrange
            const userData = {
                name: 'customer1',
                mobile: '123456788',
            }
            // // Act
            const response = await chai
                .request(app)
                .post('/customer/register')
                .send(userData)
            const customers = await customerModel.find()
            // Assert
            expect(customers).length(1)
            expect(customers[0].name).equal(userData.name)
            expect(customers[0].mobile).equal(userData.mobile)
        })
    })
})
