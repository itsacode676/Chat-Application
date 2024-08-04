const User = require('../Models/User')
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
                        { firstName: { $regex:search , $options: "i" } },
                        { lastName: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } },
                    ]
                }
            ]
        })

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
    }catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Server is not working"
        })
    }

}