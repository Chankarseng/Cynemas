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
  const movieId = event.queryStringParameters.movieId;
  const { API_URL, API_KEY } = process.env;

  const URL = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=watch/providers,external_ids`;

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

  const getMovieDetails = () => {
    return axios
      .get(URL)
      .then((res) => {
        const movieObject = {
          id: res.data.id,
          title: res.data.title,
          release_date: res.data.release_date,
          poster: `https://image.tmdb.org/t/p/w500/${res.data.poster_path}`,
          watch_providers: res.data['watch/providers'].results,
          external_ids: res.data.external_ids,
        };
        return send(movieObject);
      })
      .catch((err) => send(err));
  };
  if (event.httpMethod === 'GET') {
    return getMovieDetails();
  }
};
// app.get('/api/search/movie/:movie/details', async (req, res) => {
//   const movieParam = req.params.movie;
//   const movieDetails = await axios.get(
//     `https://api.themoviedb.org/3movie/${movieParam}?api_key=${API_KEY}&append_to_response=watch/providers,external_ids`
//   );
//   const movieObject = {
//     id: movieDetails.data.id,
//     title: movieDetails.data.title,
//     release_date: movieDetails.data.release_date,
//     poster: `https://image.tmdb.org/t/p/w500/${movieDetails.data.poster_path}`,
//     watch_providers: movieDetails.data['watch/providers'].results,
//     external_ids: movieDetails.data.external_ids,
//   };
//   res.json(movieObject);
// });
