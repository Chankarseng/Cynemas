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
  const tvName = event.queryStringParameters.tvName;
  const { API_URL, API_KEY } = process.env;
  const page = event.queryStringParameters.page;

  const URL = `${API_URL}/search/tv?api_key=${API_KEY}&query=${tvName}&page=${page}`;

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

  const getTv = () => {
    return axios
      .get(URL)
      .then((res) => send(res.data))
      .catch((err) => send(err));
  };
  if (event.httpMethod === 'GET') {
    return getTv();
  }
};
