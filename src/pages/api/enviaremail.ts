import nodemailer from 'nodemailer';

const correoGmail = process.env.GMAIL_USER;
const passGmail = process.env.GMAIL_PASS;

export function fomateohtml(mensaje: string): string {
  const mensajeEmailHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado de tu Evaluación</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #007bff;
            margin-bottom: 20px;
        }
        p {
            line-height: 1.6;
            margin-bottom: 15px;
            text-align: left; /* Alineamos el texto a la izquierda para mejor lectura */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>IANUTRI resultado de tu evaluación...</h1>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
    </div>
</body>
</html>
`;
  return mensajeEmailHTML;
}

export async function EnviarEmail(destinatario: string, asunto: string, mensaje: string ): Promise<string> {

  const mensajehtml = fomateohtml(mensaje);
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
    html: mensajehtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    return  'Correo enviado con éxito';
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return 'Error ' + error + correoGmail + passGmail;
  }
};
