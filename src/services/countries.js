import axios from 'axios';

const baseUrl = '/api/countries';
const getAllCountries = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export default { getAllCountries };
