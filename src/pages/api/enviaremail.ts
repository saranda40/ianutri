import nodemailer from 'nodemailer';

const correoGmail = process.env.GMAIL_USER;
const passGmail = process.env.GMAIL_PASS;

export async function EnviarEmail(destinatario: string, asunto: string, mensaje: string ): Promise<string> {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: correoGmail,
      pass: passGmail, 
    },
  });

  const mailOptions = {
    from: '"Mi Sitio Web" <'+ correoGmail +'>',
    to: destinatario,
    subject: asunto,
    text: mensaje,
  };

  try {
    await transporter.sendMail(mailOptions);
    return  'Correo enviado con éxito';
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return 'Error ' + error + correoGmail + passGmail;
  }
};
