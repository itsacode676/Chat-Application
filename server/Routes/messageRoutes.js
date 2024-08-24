const {
    createMessage,
    fetchMessage
} = require('../Controllers/Messasge')

const {
    authMiddleware
} = require('../Middleware/Auth')

const express = require('express')
const routes = express.Router()


routes.post('/createMessage', authMiddleware, createMessage)
routes.get('/fetchMessage/:chatId', authMiddleware, fetchMessage)


// Exporting all routes 
module.exports = routes 