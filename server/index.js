// All Routes
const authRoutes = require('./Routes/authRoutes')
const userRoutes = require('./Routes/userRoutes')
const chatRoutes = require('./Routes/chatRoutes')
const {connectCloudinary} = require('./Config/Cloudinary')

// Configurations 
require("dotenv").config()
const { dbConnection } = require("./Config/Database")
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const fileupload = require("express-fileupload")

// Creating express app
const app = express()

// Middlewares
app.use(bodyParser.json());
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}
))

// Mounting 
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/chat", chatRoutes)

dbConnection();
connectCloudinary()
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})

app.get('/', (req, res) => {
    res.send("<h1>App started sucessfully</h1>")
})

