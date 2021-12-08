// Este tiene  toda la tarde de node mailer 
const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const emailConfig = require('../config/email');
const email = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user, // generated ethereal user
        pass: emailConfig.pass, // generated ethereal password
    },
});

//generar html
const generarHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/email/${archivo}.pug`, opciones);
    return juice(html)
}

exports.enviar = async(opciones) => {
    let info = await transport.sendMail({
        from: '"Up Task 👻" <no-reply@uptask.com>', // sender address
        to: opciones.usuario.email, // list of receivers
        subject: opciones.subject, //  Subject line
        text: "Hola", // plain text body
        html: generarHTML(opciones.archivo, opciones), // html body
    });
}