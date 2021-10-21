import axios from 'axios';

const baseUrl = './.netlify/functions';

const searchCountry = (searchTerm) => {
  const request = axios
    .get(`${baseUrl}/getCountries`)
    .then((res) => {
      return { data: res.data, complete: true };
    });
  return request;
};

const searchWatchProviders = (searchTerm) => {
  const request = axios
    .get(`${baseUrl}/getMovieProviders`)
    .then((res) => {
      return { data: res.data, complete: true };
    });
  return request;
};

const searchMovie = async (searchTerm) => {
  const request = await axios.get(`${baseUrl}/getMovie?movieName=${searchTerm}`);
  return request;
};
//done
const getMovieDetails = (searchTerm) => {
  const request = axios
    .get(`${baseUrl}/getMovieDetails?movieId=${searchTerm}`)
    .then((res) => {
      return { data: res.data, complete: true };
    });
  return request;
};

const searchTV = async (searchTerm) => {
  const request = await axios.get(`${baseUrl}/getTvDetails?tvId=${searchTerm}`);
  return request;
};

const getTVDetails = (searchTerm) => {
  const request = axios
    .get(`${baseUrl}/getTv?tvName=${searchTerm}`)
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
  const request = axios.get(`${baseUrl}/getTrendingTv`).then((res) => {
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
