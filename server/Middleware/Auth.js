require('dotenv').config()
const jwt = require('jsonwebtoken')
exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const jwtRes = await jwt.verify(token, process.env.PRIVATE_KEY);
        if (!jwtRes) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized acess"
            })
        }
        req.payload = jwtRes
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to recognise token"
        })
    }
    next()
}