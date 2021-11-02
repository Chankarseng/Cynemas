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
  const tvId = event.queryStringParameters.tvId;
  const { API_URL, API_KEY } = process.env;

  const URL = `${API_URL}/tv/${tvId}?api_key=${API_KEY}&append_to_response=watch/providers,external_ids`;

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

  const getTvDetails = () => {
    return axios
      .get(URL)
      .then((res) => {
        const tvObject = {
          id: res.data.id,
          title: res.data.name,
          release_date: res.data.first_air_date,
          poster: `https://image.tmdb.org/t/p/w500/${res.data.poster_path}`,
          watch_providers: res.data['watch/providers'].results,
          external_ids: res.data.external_ids,
        };
        return send(tvObject);
      })
      .catch((err) => send(err));
  };
  if (event.httpMethod === 'GET') {
    return getTvDetails();
  }
};
