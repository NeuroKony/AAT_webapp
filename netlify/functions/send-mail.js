const client = require('@sendgrid/mail');
const {
  SENDGRID_API_KEY,
  SENDGRID_TO_EMAIL,
  SENDGRID_FROM_EMAIL,
} = process.env;

client.setApiKey(SENDGRID_API_KEY);

exports.handler = async function (event) {
  try {
    console.log('Evento recibido:', event);

    // Validar y analizar el cuerpo de la solicitud
    let parsedBody = {};
    if (event.body) {
      try {
        parsedBody = JSON.parse(event.body);
      } catch (error) {
        console.error('El cuerpo de la solicitud no es un JSON válido:', error.message);
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'El cuerpo de la solicitud no es un JSON válido.' }),
        };
      }
    }

    const { message, content, content2, content3, filename, filename2, filename3 } = parsedBody;

    const data = {
      to: SENDGRID_TO_EMAIL,
      from: SENDGRID_FROM_EMAIL,
      subject: `Proyecto AAT`,
      html: message || 'Mensaje vacío',
      attachments: [
        {
          content: Buffer.from(content || '').toString('base64'),
          filename: filename || 'archivo1.csv',
          type: 'text/csv',
          disposition: 'attachment',
        },
        {
          content: Buffer.from(content2 || '').toString('base64'),
          filename: filename2 || 'archivo2.csv',
          type: 'text/csv',
          disposition: 'attachment',
        },
        {
          content: Buffer.from(content3 || '').toString('base64'),
          filename: filename3 || 'archivo3.csv',
          type: 'text/csv',
          disposition: 'attachment',
        },
      ],
    };

    console.log('Enviando correo con los siguientes datos:', data);

    // Enviar el correo usando SendGrid
    await client.send(data);

    // Respuesta exitosa
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado con éxito.' }),
    };
  } catch (err) {
    console.error('Error al enviar el correo:', err.message);

    // Respuesta en caso de error
    return {
      statusCode: err.code || 500,
      body: JSON.stringify({ error: err.message || 'Error interno del servidor.' }),
    };
  }
};