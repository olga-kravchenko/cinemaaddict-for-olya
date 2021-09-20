const FilmToFilter = {
  Watchlist: (films) => films.filter((film) => !film.userDetails.watchlist).length,
  History: (films) => films.filter((film) => !film.userDetails.alreadyWatched).length,
  Favorites: (films) => films.filter((film) => !film.userDetails.favorite).length,
};

const generateFilter = (films) => {
  return Object.entries(FilmToFilter).map(([name, countFilms]) => {
    return {
      name,
      quantity: countFilms(films),
    };
  });
};

export {generateFilter};
