const {
    serachUser,
    updateUser
} = require('../Controllers/User')

const {
    authMiddleware
} = require('../Middleware/Auth')

const express = require('express')
const routes = express.Router()


routes.get('/find', authMiddleware, serachUser)
routes.post('/updateUser', authMiddleware, updateUser)


// Exporting all routes 
module.exports = routes 