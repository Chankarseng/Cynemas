import axios from 'axios';

const baseUrl = '/api/countries';
const getAllCountries = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const exportedObject = { getAllCountries };
export default exportedObject;
