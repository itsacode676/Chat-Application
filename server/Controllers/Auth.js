const otpGenerator = require('otp-generator')
const Otp = require('../Models/Otp')
const User = require("../Models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.otpGen = async (req, res) => {
    try {
        const {
            email,
        } = req.body

        if (!email) {
            return res.status(402).json({
                success: false,
                message: "Fill data properly"
            })
        }

        const emailExist = await User.findOne({ email: email })
        if (emailExist) {
            return res.status(402).json({
                success: false,
                message: "User already exist"
            })
        }
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        const data = Otp.create({ email: email, otp: otp })

        return res.status(200).json({
            success: true,
            message: "Otp sent sucessfully",
            data: data
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server failed",
        })
    }
}
exports.signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            pic,
            otp
        } = req.body
        // intial validations 
        if (!firstName || !lastName || !email || !password || !otp) {
            return res.status(402).json({
                success: false,
                message: "Fill data properly"
            })
        }
        // email validation
        const emailExist = await User.findOne({ email: email })
        if (emailExist) {
            return res.status(402).json({
                success: false,
                message: "User already exist"
            })
        }
        // Validation of otp
        const validOtp = await Otp.find({ otp: otp, email: email }).sort({ createdAt: -1 }).limit(1)

        if (validOtp.length === 0) {
            return res.status(402).json({
                success: false,
                message: "Invalid otp"
            })
        }

        if (validOtp[0].otp !== otp) {
            return res.status(402).json({
                success: false,
                message: "Invalid otp"
            })
        }

        // Encrypting the password
        const hashPass = await bcrypt.hash(password, process.env.ROUNDS)
        if (!hashPass) {
            return res.status(500).json({
                success: false,
                message: "Invalid otp"
            })
        }

        // Creating new user
        const imgUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`

        const userData = User.create({
            firstName,
            lastName,
            email,
            password: hashPass,
            pic: imgUrl,
            otp
        })

        return res.status(200).json({
            success: true,
            message: "User created",
            data: userData
        })

    } catch (err) {
        return res.status(500).json({
            success: true,
            message: "Server failed",
        })
    }
}
exports.login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body

        // intial validations 
        if (!email || !password) {
            return res.status(402).json({
                success: false,
                message: "Fill data properly"
            })
        }
        // email validation
        const validUser = await User.findOne({ email: email })
        if (!validUser) {
            return res.status(402).json({
                success: false,
                message: "Not a valid user"
            })
        }

        if (!bcrypt.compare(password, validUser.password)) {
            return res.status(402).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const payload = {
            id: validUser._id,
            password: validUser.password,
        }
        const options = {
            expiresIn: 3 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        }
        const token = await jwt.sign(payload, process.env.PRIVATE_KEY, options)

        if(!token){
            return res.status(500).json({
                success: false,
                message: "Server error"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User got Authorized",
            data : {
                token : token ,
                firstName : validUser.firstName,
                lastName : validUser.lastName,
                pic : validUser.pic,
                email : validUser.email,
            }
        })

    } catch (err) {
        return res.status(500).json({
            success: true,
            message: "Server failed",
        })
    }
}