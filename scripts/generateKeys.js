import crypto from 'crypto'
import fs from 'fs'

// Specify the algorithm and key length
const algorithm = 'aes-256-cbc' // You can choose a different algorithm
const keyLength = 32 // For example, 32 bytes (256 bits)

// Generate a random key
const key = crypto.randomBytes(keyLength)

console.log('Generated key:', key.toString('hex'))
