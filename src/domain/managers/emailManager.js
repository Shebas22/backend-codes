import nodemailer from "nodemailer";
import { resolve } from 'path';
import fs from "fs";
import Handlebars from 'handlebars';

class EmailManager {
    constructor() {
        this.smtp_config = {
            service: process.env.EMAIL_SERVICE,
            host: process.env.HOST_NAME,
            port: process.env.EMAIL_HOST_PORT,
            auth: {
                user: process.env.AUTH_HOST_EMAIL,
                pass: process.env.AUTH_HOST_KEY,
            },
            secure: false
        };
    }

    async send(templateFile, user, token) {
        const transporter = nodemailer.createTransport(this.smtp_config);
        const templatePath = resolve(`src/presentation/templates/${templateFile}`);
        const source = fs.readFileSync(templatePath).toString();
        const template = Handlebars.compile(source);
        const html = template({
            userName: user.firstName,
            host: process.env.SERVER_HOST,
            port: process.env.NODE_PORT,
            token: token
        });

        const mailOptions = {
            from: process.env.AUTH_HOST_EMAIL,
            to: user.email,
            subject: 'Email notifier',
            html
        };

        const result = await transporter.sendMail(mailOptions);
        if(result.rejected.length){
            throw new Error('Email not sent.');
        }
        return result
    }
}

export default EmailManager;