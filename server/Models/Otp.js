const mongoose = require('mongoose')
const {otpTemp} = require('../Templates/otp')
const {mailer} = require('../Utils/Mailer')
const otpSchema = mongoose.Schema({
    otp: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires:300
    },
    email: {
        type: String,
        trim: true
    }
})
otpSchema.pre("save", async function (next) {
    try {
        const body = otpTemp(this.otp)
        const emailData = this.email
        await mailer(emailData, body)
        next()
    } catch (err) {
        console.log("Unable to send mail", err)

    }
})
module.exports = mongoose.model("Otp", otpSchema)