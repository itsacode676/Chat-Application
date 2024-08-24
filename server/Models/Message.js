const mongoose = require("mongoose")
const messageSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            require: true,
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }
    }, {
    timestamp: true
}
)
module.exports = mongoose.model("Message",messageSchema)