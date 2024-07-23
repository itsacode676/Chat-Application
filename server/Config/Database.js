require("dotenv").config()
const mongoose = require('mongoose')
exports.dbConnection = () => {
    mongoose.connect(process.env.mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        () => {console.log(`Database connected sucessfully with uri ${process.env.mongo_uri}`)}
    )
    .catch((err) => {
        console.log("Database connection error" , err)
        throw err ;
    })
}
