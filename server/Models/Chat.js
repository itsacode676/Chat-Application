const mongoose = require("mongoose")
const chatSchema = mongoose.Schema({
    chatName: {
        type: String,
        trim: true
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages"
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    groupPic: {
        type: String
    }
}, {
    timestamp: true
})
module.exports = mongoose.model("Chat", chatSchema)