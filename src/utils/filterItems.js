export const filterItems = (
  listOfItems,
  titleFilter,
  selectedCountry,
  selectedProviders,
  currentSearchType
) => {
  return listOfItems !== null || listOfItems.length !== 0
    ? listOfItems
        .filter((movie) => {
          return movie.title.toLowerCase().includes(titleFilter.toLowerCase());
        })
        .filter((movie) => {
          const filter1 =
            Object.keys(movie.watch_providers).length > 0
              ? Object.keys(movie.watch_providers).some((v) => {
                  if (selectedCountry.length > 0) {
                    if (movie.watch_providers[v].hasOwnProperty('flatrate')) {
                      return selectedCountry.includes(v);
                    }
                    return false;
                  }
                  // Return all
                  return true;
                })
              : selectedCountry.length > 0
              ? false
              : true;

          const filter2 =
            Object.values(movie.watch_providers).length > 0
              ? Object.values(movie.watch_providers).some((v) => {
                  // console.log(v)
                  if (selectedProviders.length > 0) {
                    if (v.hasOwnProperty('flatrate')) {
                      const allProviders = v.flatrate.reduce((acc, current) => {
                        return acc.concat(current.provider_name);
                      }, []);
                      const found = allProviders.some((a) => {
                        return selectedProviders.includes(a);
                      });

                      return found;
                    }
                    return false;
                  } else {
                    return true;
                  }
                })
              : selectedProviders.length > 0
              ? false
              : true;
          return filter1 && filter2;
        })
    : null;
};

