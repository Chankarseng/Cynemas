import axios from 'axios';

const baseUrl = 'https://agile-earth-37278.herokuapp.com/api/countries';
const getAllCountries = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const exportedObject = { getAllCountries };
export default exportedObject;
