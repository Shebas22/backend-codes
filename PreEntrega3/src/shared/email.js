import dotenv from "dotenv";
dotenv.config();

class Email {
    constructor(mailTemplate) {
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_HOST_PORT,
            auth: {
                user: process.env.SMTP_HOST_EMAIL,
                pass: process.env.SMTP_HOST_KEY,
            },
        })
    }

    send(mailTemplate){
        const mail = {
            from: 'EcommerceApi',
            to: ''
        }
    }


}

export default Email;