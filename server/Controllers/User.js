const User = require('../Models/User')
const { cloudinaryUploader } = require('../Utils/Cloudinary')
require("dotenv").config()
exports.serachUser = async (req, res) => {
    try {
        const { search } = req.query
        const { id } = req.payload
        if (!search || !id) {
            return res.status(402).json({
                success: false,
                message: "Insufficient data"
            })
        }
        const searchData = await User.find({
            $and: [
                { _id: { $ne: id } },
                {
                    $or: [
                        { firstName: { $regex: search, $options: "i" } },
                        { lastName: { $regex: search, $options: "i" } },
                    ]
                }
            ]
        }).select('firstName lastName email pic');

        if (!searchData.length) {
            return res.status(402).json({
                success: false,
                message: "Unable to find user"
            })
        }

        return res.status(200).json({
            success: true,
            data: searchData
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server is not working"
        })
    }

}

exports.updateUser = async (req, res) => {
    try {
        const {  firstName, lastName } = req.body
        const pic = req.files.pic
        const { id } = req.payload
        if (!pic || !id || !firstName || !lastName) {
            return res.status(402).json({
                success: false,
                message: "Insufficient data"
            })
        }
        const updatedPic = await cloudinaryUploader(pic, process.env.CLOUDINARY_FOLDER)
        const updatedData = await User.findByIdAndUpdate(id, {
            firstName: firstName,
            lastName: lastName,
            pic: updatedPic.secure_url
        },{
            new:true
        })

        if (!updatedData) {
            return res.status(402).json({
                success: false,
                message: "Unable to find user"
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                id:updatedData._id,
                firstName: updatedData.firstName,
                lastName: updatedData.lastName,
                pic: updatedData.pic,
                email: updatedData.email,
            }
        })
    } catch (err) {
        console.log("ERROR",err)
        return res.status(500).json({
            success: false,
            message: "Server is not working"
        })
    }

}