import axios from 'axios';

const baseUrl = 'https://agile-earth-37278.herokuapp.com/api/search';

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

const searchMovie = async (searchTerm) => {
  const request = await axios.get(`${baseUrl}/movie/${searchTerm}`);
  return request;
};

const getMovieDetails = (searchTerm) => {
  const request = axios
    .get(`${baseUrl}/movie/${searchTerm}/details`)
    .then((res) => {
      return { data: res.data, complete: true };
    });
  return request;
};

const searchTV = async (searchTerm) => {
  const request = await axios.get(`${baseUrl}/tv/${searchTerm}`);
  return request;
};

const getTVDetails = (searchTerm) => {
  const request = axios
    .get(`${baseUrl}/tv/${searchTerm}/details`)
    .then((res) => {
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

const getTrendingTv = () => {
  const request = axios.get(`${baseUrl}/trending/tv`).then((res) => {
    return { data: res.data, complete: true };
  });
  return request;
};

const exportedObject = {
  searchMovie,
  searchCountry,
  searchWatchProviders,
  getMovieDetails,
  getTrendingMovies,
  getTrendingTv,
  searchTV,
  getTVDetails,
};
export default exportedObject;
