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
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            require: true,
        },
    }, {
    timestamp: true
}
)
module.exports = mongoose.model("Message",messageSchema)