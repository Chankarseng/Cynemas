import { AsyncSelect } from 'chakra-react-select';
import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import searchService from '../services/search';
const SearchProviders = (props) => {
  const [ProviderInputValue, setProviderInputValue] = useState([]);
  const handleChange = (value) => {
    let providerArray = [];
    value.forEach((v) => {
      providerArray = providerArray.concat(v.value);
    });
    setProviderInputValue(value);
    props.setSelectedProviders(providerArray);
  };

  const loadOptions = async (value, callback) => {
    callback(await filterData(value));
  };
  const filterData = async (value) => {
    if (value !== '') {
      const result = await searchService.searchWatchProviders(value);
      const finalResult = result.data
        .filter((data) => {
          return data.provider_name.toLowerCase().includes(value.toLowerCase());
        })
        .map((result) => {
          return {
            label: (
              <Flex>
                <Image
                  w={6}
                  fallbackSrc="https://via.placeholder.com/150"
                  alt=""
                  src={`https://image.tmdb.org/t/p/w500/${result.logo_path}`}
                />
                <Text px={2} size="sm">
                  {result.provider_name}
                </Text>
              </Flex>
            ),
            value: result.provider_name,
          };
        });
      return finalResult;
    }
    return {};
  };

  return (
    <AsyncSelect
      placeholder="Search Streaming Provider"
      size="lg"
      isMulti
      cacheOptions
      value={ProviderInputValue}
      loadOptions={loadOptions}
      // onInputChange={handleChange}
      onChange={handleChange}
      noOptionsMessage={() => '⌨️ Type to start searching!'}
      openMenuOnFocus={false}
      openMenuOnClick={false}
    />
  );
};

export default SearchProviders;
