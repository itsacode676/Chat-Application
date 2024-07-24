const nodemailer = require("nodemailer");
require('dotenv').config()
exports.mailer = (email,body) => {
    const transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from:process.env.MAIL_USER, // sender address
            to: email, // list of receivers
            subject: "PIGEON POST || OTP", // Subject line
            html: body, // html body
        });

        // console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

}