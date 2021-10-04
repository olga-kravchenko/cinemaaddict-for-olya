import {FilterType} from "../constants";

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => !film.userDetails.watchlist).length,
  [FilterType.HISTORY]: (films) => films.filter((film) => !film.userDetails.alreadyWatched).length,
  [FilterType.FAVORITES]: (films) => films.filter((film) => !film.userDetails.favorite).length,
};

export {filter};
