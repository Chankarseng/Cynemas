const axios = require('axios');
exports.handler = async function (event, context) {
  const { API_URL, API_KEY } = process.env;

  // const page = event.queryStringParameters.page;

  const URL = `${API_URL}/trending/tv/day?api_key=${API_KEY}`;

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

  const getTrending = () => {
    return axios
      .get(URL)
      .then((res) => send(res.data))
      .catch((err) => send(err));
  };
  if (event.httpMethod === 'GET') {
    return getTrending();
  }
};
