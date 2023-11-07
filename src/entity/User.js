import { EntitySchema } from 'typeorm'

const UserEntity = new EntitySchema({
    name: 'User',
    collection: 'users', // Specify the MongoDB collection name
    columns: {
        id: {
            primary: true,
            type: 'objectId',
            generated: 'true',
        },
        // You can add more properties as needed
    },
})

export default UserEntity
