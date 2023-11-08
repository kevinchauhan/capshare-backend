import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.js' // Import your Express app

chai.use(chaiHttp)
const expect = chai.expect

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
    })

    describe('missing fields', () => {})
})
