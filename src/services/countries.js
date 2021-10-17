import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/countries';
const getAllCountries = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export default { getAllCountries };
