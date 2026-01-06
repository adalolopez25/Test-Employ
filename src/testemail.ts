import nodemailer from 'nodemailer';

async function testEmail() {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false, // TLS
    auth: {
      user: 'postmaster@sandbox3f6880c40c65473aa1e1b2397c13caa3.mailgun.org',
      pass: 'AndresArmenta@25',
    },
  });

  let info = await transporter.sendMail({
    from: '"Rick and Morty App" <postmaster@sandbox3f6880c40c65473aa1e1b2397c13caa3.mailgun.org>',
    to: 'andresadalo25@gmail.com',
    subject: 'Prueba Sandbox',
    text: '¡Funciona!',
  });

  console.log('Mensaje enviado: %s', info.messageId);
}

testEmail();