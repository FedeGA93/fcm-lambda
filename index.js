const axios = require('axios');

exports.handler = async (event) => {
  const eventBody = JSON.parse(event.body)
  console.log('este es el body', eventBody)
  const token = eventBody.token;
  const title = eventBody.title;
  const body = eventBody.body;
  const data = eventBody.data;

  const serverKey = ''
   const url = 'https://fcm.googleapis.com/fcm/send';

  const headers = {
    'Authorization': `key=${serverKey}`,
    'Content-Type': 'application/json'
  };

  const payload = {
    to: token,
    notification: {
      title: title,
      body: body
    },
    data: data
  };

  try {
    console.log('Sending push notification...' , payload)
    const response = await axios.post(url, payload, { headers });
    console.log('Push notification sent successfully:', response.data);
    return {
      statusCode: 200,
      body: JSON.stringify('Push notification sent successfully')
    };
  } catch (error) {
    console.error('Error sending push notification:', error.response.data);
    return {
      statusCode: 500,
      body: JSON.stringify('Error sending push notification', error.response.data)
    };
  }
};
