import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.js'

chai.use(chaiHttp)
const expect = chai.expect

describe('POST /customer/register', () => {
    it('should return 201 status code', async () => {
        // Arrange
        const userData = {
            name: 'customer1',
            phone: '1234567898',
        }
        // Act
        const response = await chai
            .request(app)
            .post('/customer/register')
            .send(userData)
        // Assert
        expect(response).status(201)
    })
})
