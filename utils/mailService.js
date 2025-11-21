const mailSender = require('nodemailer')

const sendingMail = async (to ,subject , text) =>{
    const transporter = mailSender.createTransport({
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : 'cyphersafe01@gmail.com',
            pass : 'wloh mtel fwtm jobe'
        }
    })

    const options = {
        from : 'cyphersafe01@gmail.com',
        to : to,
        subject : subject,
        html : text
    }

    const mailRes = await transporter.sendMail(options);
    return mailRes;
}

module.exports = {
    sendingMail
}