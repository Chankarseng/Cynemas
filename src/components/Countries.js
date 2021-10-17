import React, { useEffect, useState } from 'react';
import countriesService from '../services/countries';
import { Image, WrapItem, Wrap, Button } from '@chakra-ui/react';
const Countries = () => {
  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    (async () => {
      const countryListResult = await countriesService.getAllCountries();
      setCountryList(countryListResult);
    })();
  }, []);
  return (
    <Wrap>
      {countryList.map((c) => {
        const countryImage = (
          <Image
            alt={c.iso_3166_1}
            src={`https://www.countryflags.io/${c.iso_3166_1}/flat/16.png`}

          />
        );
        return <WrapItem><Button leftIcon={countryImage}>{c.english_name}</Button></WrapItem>;
      })}
    </Wrap>
  );
};

export default Countries;
