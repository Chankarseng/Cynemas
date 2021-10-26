import { AsyncSelect } from 'chakra-react-select';
import { Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import searchService from '../services/search';
import { getFlagEmoji } from '../utils/getFlagEmoji';
const SearchCountries = (props) => {
  const excludedCountries = [
    'East Germany',
    'Yugoslavia',
    'Czechoslovakia',
    'Netherlands Antilles',
    'Serbia and Montenegro',
    'Soviet Union'
  ];
  const [countryInputValue, setCountryInputValue] = useState([]);
  const handleChange = (value) => {
    let countryArray = [];
    value.forEach((v) => {
      countryArray = countryArray.concat(v.value);
    });
    setCountryInputValue(value);
    props.setSelectedCountry(countryArray);
  };

  const loadOptions = async (value, callback) => {
    callback(await filterData(value));
  };

  const filterData = async (value) => {
    if (value !== '') {
      const result = await searchService.searchCountry(value);
      const finalResult = result.data
        .filter((data) => {
          return (
            !excludedCountries.includes(data.english_name) &&
            data.english_name.toLowerCase().includes(value.toLowerCase())
          );
        })
        .map((result) => {
          return {
            label: (
              <Flex>
                {getFlagEmoji(result.iso_3166_1)}
                <Text px={2} size="sm">
                  {result.english_name}
                </Text>
              </Flex>
            ),
            value: result.iso_3166_1,
          };
        });
      return finalResult;
    }
    return {};
  };

  return (
    <AsyncSelect
      placeholder="Search Countries"
      size="lg"
      isMulti
      cacheOptions
      value={countryInputValue}
      loadOptions={loadOptions}
      // onInputChange={handleChange}
      onChange={handleChange}
      noOptionsMessage={() => '⌨️ Type to start searching!'}
      openMenuOnFocus={false}
      openMenuOnClick={false}
    />
  );
};

export default SearchCountries;
