const Chat = require("../Models/Chat")
const { cloudinaryUploader } = require('../Utils/Cloudinary')

exports.chatAcess = async (req, res) => {
    try {
        const { userId, chatName } = req.body
        if (!userId || !chatName) {
            return res.status(402).json({
                success: false,
                message: "Insufficient data"
            })
        }
        const { id } = req.payload
        const isChat = await Chat.findOne(
            {
                isGroupChat: false,
                user: { $all: [userId, id] }
            }
        ).populate("user", "-password")
            .populate({
                path: "latestMessage",
                populate: {
                    path: "sender"
                }
            })

        if (isChat) {
            return res.status(200).json({
                success: true,
                data: isChat
            })
        }

        const newdata = await Chat.create({
            chatName: chatName,
            isGroupChat: false,
            user: [userId, id],
        })

        const chatData = await Chat.findById(newdata._id).populate("user", "-password")

        if (!chatData) {
            return res.status(402).json({
                success: false,
                message: "Unable to create chat"
            })
        }

        return res.status(200).json({
            success: true,
            data: chatData
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

exports.fetchChat = async (req, res) => {
    try {
        const { id } = req.payload
        const data = await Chat.find({
            user: id
        }).populate("user", "-password")
            .populate("groupAdmin", "-password")
            .populate({
                path: "latestMessage",
                populate: {
                    path: "sender",
                    select: "firstName lastName pic email"
                }
            })
            .sort({ updatedAt: -1 })

        if (!data) {
            return res.status(402).json({
                success: false,
                message: "Not data found"
            })
        }
        return res.status(200).json({
            success: true,
            data: data
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

exports.GroupChat = async (req, res) => {
    try {
        const {
            groupName,
            users
        } = req.body
        const groupPic = req.files.groupPic
        const { id } = req.payload
        console.log(groupName, JSON.parse(users), groupPic)
        if (!groupName || !users || !groupPic) {
            return res.status(402).json({
                success: false,
                message: "Insufficient data"
            })
        }

        const user = JSON.parse(users)

        const updatedPic = await cloudinaryUploader(groupPic, process.env.CLOUDINARY_FOLDER)

        if (user.length < 2) {
            return res.status(402).json({
                success: false,
                message: "Minimum group members should be 3"
            })
        }

        user.push(id)

        const data = await Chat.create({
            chatName: groupName,
            isGroupChat: true,
            user: user,
            groupAdmin: id,
            groupPic: updatedPic.secure_url
        })

        const populatedChat = await Chat.findById(data._id)
            .populate("user", "-password")
            .populate("groupAdmin", "-password");

        if (!data) {
            return res.status(402).json({
                success: false,
                message: "Unable to create group"
            })
        }
        return res.status(200).json({
            success: true,
            data: populatedChat
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


exports.renameGroup = async (req, res) => {
    try {
        const { groupName, groupId } = req.body
        if (!groupName || !groupId) {
            return res.status(402).json({
                success: false,
                message: "Insufficient data"
            })
        }
        const { id } = req.payload
        const data = await Chat.findByIdAndUpdate(
            {
                _id: groupId,
                groupAdmin: id
            },
            {
                chatName: groupName
            },
            {
                new: true
            }
        ).populate("user", "-password")
            .populate("groupAdmin", "-password")
        if (!data) {
            return res.status(402).json({
                success: false,
                message: "Unable to change group name"
            })
        }
        return res.status(200).json({
            success: true,
            data: data
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

exports.addToGroup = async (req, res) => {
    try {
        const { id } = req.payload
        const { userId, groupId } = req.body
        if (!userId || !groupId) {
            return res.status(402).json({
                success: false,
                message: "Insufficient data"
            })
        }
        const isChat = await Chat.findOne({
            _id: groupId,
            user: userId
        })
        if (isChat) {
            return res.status(402).json({
                success: false,
                message: "User can't be added"
            })
        }
        const data = await Chat.findByIdAndUpdate(
            {
                _id: groupId,
                groupAdmin: id
            },
            {
                $push: {
                    user: userId
                }
            },
            {
                new: true
            }
        ).populate("user", "-password")
            .populate("groupAdmin", "-password")
        if (!data) {
            return res.status(402).json({
                success: false,
                message: "Can't add to group"
            })
        }
        return res.status(200).json({
            success: true,
            data: data
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

exports.removeFromGroup = async (req, res) => {
    try {
        const { id } = req.payload
        const { userId, groupId } = req.body
        if (!userId || !groupId) {
            return res.status(402).json({
                success: false,
                message: "Insufficient data"
            })
        }
        const isChat = await Chat.findOne({
            _id: groupId,
            user: userId
        })
        if (!isChat) {
            return res.status(402).json({
                success: false,
                message: "User can't be Removed"
            })
        }
        console.log(isChat.groupAdmin, userId)
        if (isChat.groupAdmin == userId) {
            const newAdmin = isChat.user[0] != id ? isChat.user[0] : isChat.user[1];
            console.log("NEW", newAdmin)
            await Chat.findByIdAndUpdate({
                _id: groupId
            }, {
                groupAdmin: newAdmin
            }, { new: true })
        }
        const data = await Chat.findByIdAndUpdate(
            {
                _id: groupId
            },
            {
                $pull: {
                    user: userId
                }
            },
            {
                new: true
            }
        ).populate("user", "-password")
            .populate("groupAdmin", "-password")
        if (!data) {
            return res.status(402).json({
                success: false,
                message: "Can't remove from group"
            })
        }
        return res.status(200).json({
            success: true,
            data: data
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}