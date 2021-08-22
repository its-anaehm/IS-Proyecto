import transporter from "../config/mailer";
import Receiver from "../models/Receiver";

const sendEmail = (receiverInfo: Receiver) => {
    transporter.sendMail({
        from: '"Luis Martinez" <lkez.hn@gmail.com',
        to: `"${receiverInfo.firstName} ${receiverInfo.lastName}" <${receiverInfo.email}>`,
        subject: "Tenemos nuevos productos para tí en Websted",
        html: `<p>Saludos ${receiverInfo.firstName} ${receiverInfo.lastName}.</p>
        
        <p>Queremos informarte que durante esta semana se han publicado ${receiverInfo.numeroProductos} nuevos productos relacionados a tus categorías suscritas, échales un vistazo en nuestra página.</p>
        <a href="www.google.hn">Websted</a>
        <p>Recuerda que en Websted puedes comprar o vender los productos que necesites.</p>`
    })
}

export default sendEmail;