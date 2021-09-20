const filmToFilterMap = {
  "Watchlist": (films) => films.filter((film) => !film.userDetails.watchlist).length,
  "History": (tasks) => tasks.filter((films) => !films.userDetails.alreadyWatched).length,
  "Favorites": (tasks) => tasks.filter((films) => !films.userDetails.favorite).length,
};

const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};

export {generateFilter};
