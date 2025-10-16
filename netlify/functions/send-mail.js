const client = require('@sendgrid/mail');
const {
  SENDGRID_API_KEY,
  SENDGRID_TO_EMAIL,
  SENDGRID_FROM_EMAIL,
} = process.env;

client.setApiKey(SENDGRID_API_KEY);

exports.handler = async function (event, context, callback) {
  const { message, content, content2, content3, filename, filename2, filename3 } = JSON.parse(event.body);

  const data = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    subject: `Proyecto AAT`,
    html: message,
    attachments: [
      {
        content: Buffer.from(content).toString('base64'),
        filename,
        type: 'text/csv',
        disposition: 'attachment',
        content_id: 'csv'
      },
      {
        content: Buffer.from(content2).toString('base64'),
        filename: filename2,
        type: 'text/csv',
        disposition: 'attachment',
        content_id: 'csv'
      },
      {
        content: Buffer.from(content3).toString('base64'),
        filename: filename3,
        type: 'text/csv',
        disposition: 'attachment',
        content_id: 'csv'
      },
    ],
  };

  client
    .send(data)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

  /*try {
    await client.send(data);
    return {
      statusCode: 200,
      body: 'Message sent',
    };
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message }),
    };
  }*/
};