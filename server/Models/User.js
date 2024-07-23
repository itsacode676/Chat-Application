const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        pic: {
            type: String,
            default:"https://drive.google.com/drive/u/0/my-drive"
        },
    }, {
    timestamp: true
}
)
module.exports = mongoose.model("User", userSchema)