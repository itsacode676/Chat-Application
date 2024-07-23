const mongoose = require('mongoose')
require('dotenv').config()
exports.dbConnection = ()=>{
    mongoose.connect(process.env.mongo_uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log('Database connection sucessfull'))
    .catch((err)=>{
        console.log("Database connection error : ",err)
        throw err
    })
}