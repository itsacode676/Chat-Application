const nodemailer = require("nodemailer");
require('dotenv').config()
exports.mailer = (email, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const info = transporter.sendMail({
            from: process.env.MAIL_USER, // sender address
            to: email, // list of receivers
            subject: "PIGEON POST || OTP", // Subject line
            html: body, // html body
        });

        return info
    }
    catch (error) {
        console.log(error)
        throw error
    }

}