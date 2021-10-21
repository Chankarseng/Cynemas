import axios from 'axios';

const baseUrl = './.netlify/functions';

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
//done
const getMovieDetails = (searchTerm) => {
  const request = axios
    .get(`${baseUrl}/getMovieDetails?movieName=${searchTerm}`)
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
    .get(`${baseUrl}/getTvDetails?tvName=${searchTerm}`)
    .then((res) => {
      return { data: res.data, complete: true };
    });
  return request;
};


const getTrendingMovies = () => {
  const request = axios.get(`${baseUrl}/getTrendingMovies`).then((res) => {
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
