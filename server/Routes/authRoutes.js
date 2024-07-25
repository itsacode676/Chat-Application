const {
    otpGen,
    signUp,
    login
} = require('../Controllers/Auth')

const {
    authMiddleware
} = require('../Middleware/Auth')

const express = require('express')
const routes = express.Router()

// Auth Routes 
routes.post('/otpGen',otpGen)
routes.post('/signUp',signUp)
routes.post('/login',login)

// Exporting all routes 
module.exports = routes 