var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: "smtp.email.com.br",
    port: 465,
    secure: true,
    auth: {
        user: "usuario@email.com.br",
        pass: "senha"
    }
});

var mailOptions = {
    from: '"Nome do remetente" <email@remetente.com.br>',
    to: "destinatario@email.com.br",
    subject: "Nodejs - Envio de e-mail",
    text: "O e-mail foi efectuado com sucesso"
}

transporter.sendMail(mailOptions, function(err, info){
    if(err){
        console.log(err);
    }else{
        console.log("Mensagem enviada com sucesso");
    }
});