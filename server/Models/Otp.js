const mongoose = require('mongoose')
const otpTemp = require('../Templates/otp')
const mailer = require('../Utils/Mailer')
const otpSchema = mongoose.Schema({
    otp: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires:180
    },
    email: {
        type: String,
        trim: true
    }
})
otpSchema.pre("save", async (next) => {
    try {
        const body = otpTemp(this.otp)
        const email = this.email
        const response = mailer(email, body)
        console.log("Mailsent sucessfully", response)
        next()
    } catch (err) {
        console.log("Unable to send mail", err)

    }
})
module.exports = mongoose.model("Otp", otpSchema)