import * as mailer from "nodemailer";
import mailerSendGrid from "nodemailer-sendgrid";


const transporter = mailer.createTransport(
    mailerSendGrid({
        apiKey: "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"
    })
);

export default transporter;