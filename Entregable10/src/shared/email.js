import dotenv from "dotenv";
import nodemailer from 'nodemailer';
dotenv.config();

class Email {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_HOST_PORT,
            auth: {
                user: process.env.AUTH_HOST_EMAIL,
                pass: process.env.AUTH_HOST_KEY,
            },
        })
    }

    async sendForgetPassword(user, token) {
        const mail = {
            from: process.env.AUTH_HOST_EMAIL,
            to: user.email,
            subject: 'Reset password',
            html: 
            `<!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>Restablecer Contraseña</title>
            </head>
            <body>
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <tr>
            <td align="center">
            <img src="cid:1" alt="Logo" style="max-width: 200px; margin-bottom: 20px;">
            <h2>Restablecer Contraseña</h2>
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <p><a href='${process.env.SERVER_HOST}${process.env.NODE_PORT}/api/sessions/forget-password?accessToken=${token}'>Change password</a></p>
            <p>Si no solicitaste restablecer tu contraseña, ignora este mensaje.</p>
            </td>
            </tr>
            </table>
            </body>
            </html>`,
            attachments:[{
                filename: "resetPass.png",
                path: "https://cdn-icons-png.flaticon.com/512/6195/6195699.png",
                cid: '1'
            }]
        }
        const result = await this.transporter.sendMail(mail)
        if(result.rejected.length){
            throw new Error('Email not sent.');
        }
        return result
    }


}

export default Email;