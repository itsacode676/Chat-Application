const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            trim:true
        },
        lastName: {
            type: String,
            require: true,
            trim:true
        },
        email: {
            type: String,
            require: true,
            trim:true
        },
        password: {
            type: String,
            require: true,
        },
        pic: {
            type: String,
            default:"https://drive.google.com/drive/u/0/my-drive",
            trim:true
        },
    }, {
    timestamp: true
}
)
module.exports = mongoose.model("User", userSchema)