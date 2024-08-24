// All Routes
const authRoutes = require('./Routes/authRoutes')
const userRoutes = require('./Routes/userRoutes')
const chatRoutes = require('./Routes/chatRoutes')
const messageRoutes = require('./Routes/messageRoutes')
const { connectCloudinary } = require('./Config/Cloudinary')

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
    useTempFiles: true,
    tempFileDir: '/tmp/'
}
))

// Mounting 
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/chat", chatRoutes)
app.use("/api/v1/message", messageRoutes)

dbConnection();
connectCloudinary()
const port = process.env.PORT || 8000

const server = app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})

app.get('/', (req, res) => {
    res.send("<h1>App started sucessfully</h1>")
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
    }

})

io.on("connect", (socket) => {
    console.log("connected to socket.io")

    socket.on("setup", (userData) => {
        socket.join(userData.id);
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room);
        socket.emit(`User join the room ${room}`)
        console.log("USER JOINED ROOM : " + room)
    })

    socket.on("typing" , (room) => {
        console.log(room)
        socket.in(room).emit("typing")
    }) 

    socket.on("stop typing" , (room) => {
      
        socket.in(room).emit("stop typing")
    }) 


    socket.on("new message", (newMessage) => {
        socket.in(newMessage.chatId._id).emit("message received", newMessage)
    })

})

