const axios = require('axios');
exports.handler = async function (event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
      body: JSON.stringify({
        message: 'Method not supported',
      }),
    };
  }
  const { API_URL, API_KEY } = process.env;

  const URL = `${API_URL}/watch/providers/tv?api_key=${API_KEY}`;

  const send = (body) => {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
      body: JSON.stringify(body),
    };
  };

  const getTvProviders = () => {
    return axios
      .get(URL)
      .then((res) => send(res.data))
      .catch((err) => send(err));
  };
  if (event.httpMethod === 'GET') {
    return getTvProviders();
  }
};
