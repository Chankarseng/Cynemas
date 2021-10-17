import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import { DATA } from './example_data';
function App() {
  const resultData = DATA.results;
  const [inputValue, setInputValue] = useState([]);
  
  const [listOfMovies, setListOfMovies] = useState([]);
  const [countryList, setCountryList] = useState([]);
  // console.log(resultData);
  const API_KEY = 'a9eeee95411ebb7f5871e48ebbe7bab7';
  useEffect(() => {
    (async () => {
      const countryListResult = await axios.get(
        `https://api.themoviedb.org/3/configuration/countries?api_key=${API_KEY}`
      );
      setCountryList(countryListResult.data);
    })();
  }, []);
  console.log('CountryList', countryList);
  const filterData = async (value) => {
    if (value !== '') {
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`
      );
      console.log(result);
      const finalResult = result.data.results
        .filter((data) =>
          data.title.toLowerCase().includes(value.toLowerCase())
        )
        .map((result) => {
          return {
            label: `${result.title} (${result.release_date.substring(0, 4)})`,
            value: result.id,
          };
        });
      return finalResult;
    }
    return {};
    // return resultData
    //   .filter((data) => data.title.toLowerCase().includes(value.toLowerCase()))
    //   .map((result) => {
    //     return {
    //       label: result.title + ' ' + result.release_date.substring(0, 4),
    //       value: result.title + ' ' + result.release_date.substring(0, 4),
    //     };
    //   });
  };
  const loadOptions = async (value, callback) => {
    callback(await filterData(value));
  };

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleClick = () => {
    inputValue.forEach(async (movie) => {
      console.log(movie);
      const movieDetails = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.value}?api_key=${API_KEY}&append_to_response=watch/providers`
      );
      console.log('movieDetails', movieDetails);
      const movieObject = {
        title: movieDetails.data.title,
        release_date: movieDetails.data.release_date,
        moviePoster: `https://image.tmdb.org/t/p/w500/${movieDetails.data.poster_path}`,
        watch_providers: movieDetails.data['watch/providers'].results,
      };
      setListOfMovies((oldList) => [...oldList, movieObject]);
    });
    setInputValue([]);
  };
  return (
    <div>
      {countryList.map((c) => {
        return (
          <img
            alt={c.iso_3166_1}
            src={`https://www.countryflags.io/${c.iso_3166_1}/flat/32.png`}
          />
        );
      })}
      {inputValue.map((i) => {
        return (
          <p>
            {i.value} {i.label}
          </p>
        );
      })}
      {listOfMovies === null
        ? null
        : listOfMovies.map((movie) => {
            const keys = Object.keys(movie.watch_providers);
            return (
              <div>
                <p>{movie.title}</p>
                <p>{movie.release_date}</p>
                <img
                  height="150px"
                  width="100px"
                  alt="poster"
                  src={movie.moviePoster}
                />
                {keys.map((country) => {
                  const countryStreamingService =
                    movie.watch_providers[country];
                  if (countryStreamingService.hasOwnProperty('flatrate')) {
                    // console.log(movie.title + ' ' + country + ' ' + countryStreamingService.flatrate.map((service) => {
                    // 	return service.provider_name
                    // }))
                    return (
                      <span>
                        {country}:{' '}
                        {countryStreamingService.flatrate.map((service) => {
                          return <span>{service.provider_name}, </span>;
                        })}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            );
          })}
      <AsyncSelect
        isMulti
        cacheOptions
        value={inputValue}
        loadOptions={loadOptions}
        // onInputChange={handleChange}
        onChange={handleChange}
        noOptionsMessage={() => '⌨️ Type to start searching!'}
        openMenuOnFocus={false}
        openMenuOnClick={false}
      />
      <div></div>
      {/* {resultData.map((result) => {
				return <img height="150px" width="100px" alt="poster" src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}/>
			})} */}
      <button onClick={handleClick}>RESET</button>
    </div>
  );
}

export default App;
