const {
    chatAcess,
    fetchChat,
    GroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
} = require('../Controllers/Chat')

const {
    authMiddleware
} = require('../Middleware/Auth')

const express = require('express')
const routes = express.Router()

// Auth Routes 
routes.post('/createChat', authMiddleware, chatAcess)
routes.get('/getChats', authMiddleware, fetchChat)
routes.post('/CreateGroupChat', authMiddleware, GroupChat)
routes.put('/renameGroup', authMiddleware, renameGroup)
routes.put('/addToGroup', authMiddleware, addToGroup)
routes.put('/removeFromGroup', authMiddleware, removeFromGroup)
// Exporting all routes 
module.exports = routes 