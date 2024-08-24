const Chat = require("../Models/Chat")
const Message = require("../Models/Message")
exports.createMessage = async (req, res) => {
    try {
        const {
            content,
            chatId
        } = req.body
        const { id } = req.payload
        if (!content || !chatId) {
            return res.status(402).json({
                success: false,
                message: "Insufficient data",
            })
        }

        const message = await Message.create({
            sender: id,
            chatId: chatId,
            content: content
        })

        if (!message) {
            return res.status(402).json({
                success: false,
                message: "Unable to send message",
            })
        }

        const messageData = await Message.findById(
            message._id).populate("sender", "-password")
            .populate("chatId")

        const chatData = await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message._id
        })

        return res.status(200).json({
            success: true,
            message: "Message sent",
            data: messageData
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server issue",
        })
    }
}

exports.fetchMessage = async (req, res) => {
    try {
        const {
            chatId
        } = req.params

        if (!chatId) {
            return res.status(402).json({
                success: false,
                message: "Insufficient data",
            })
        }

        const messages = await Message.find({
            chatId: chatId,
        }).populate("sender", "-password")
            .populate("chatId")


        if (!messages) {
            return res.status(402).json({
                success: false,
                message: "Unable to get messages",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Message fetched",
            data: messages
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server issue",
        })
    }
}