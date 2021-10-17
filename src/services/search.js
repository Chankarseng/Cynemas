import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/search';

const searchMovie = async (searchTerm) => {
  const request = await axios.get(`${baseUrl}/${searchTerm}`);
  return request;
};

const searchCountry = (searchTerm) => {
  const request = axios
    .get(`${baseUrl}/countries/${searchTerm}`)
    .then((res) => {
      return { data: res.data, complete: true };
    });
  return request;
};

const searchWatchProviders = (searchTerm) => {
  const request = axios
    .get(`${baseUrl}/watch_providers/${searchTerm}`)
    .then((res) => {
      return { data: res.data, complete: true };
    });
  return request;
};

const getMovieDetails = (searchTerm) => {
  const request = axios.get(`${baseUrl}/${searchTerm}/details`).then((res) => {
    return { data: res.data, complete: true };
  });
  return request;
};

const getTrendingMovies = () => {
  const request = axios.get(`${baseUrl}/trending/movies`).then((res) => {
    return { data: res.data, complete: true };
  });
  return request;
};

export default {
  searchMovie,
  searchCountry,
  searchWatchProviders,
  getMovieDetails,
  getTrendingMovies,
};
