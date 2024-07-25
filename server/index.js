// All Routes
const authRoutes = require('./Routes/authRoutes')

// Configurations 
require("dotenv").config()
const { dbConnection } = require("./Config/Database")
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

// Creating express app
const app = express()

// Middlewares
app.use(bodyParser.json());
app.use(express.json())

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

// Mounting 
app.use("/api/v1/auth", authRoutes)

dbConnection();
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})

app.get('/', (req, res) => {
    res.send("<h1>App started sucessfully</h1>")
})

