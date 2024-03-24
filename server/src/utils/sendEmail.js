import nodemailer from "nodemailer";

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: "Advanced Authentication",
            address: process.env.EMAIL_USERNAME
        },
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err)
            } else {
                resolve(info)
            }
        });
    });
}

export default sendEmail;