import {UserStatus} from "../constants";

const NOVICE_MIN_QUANTITY = 1;
const FAN_MIN_QUANTITY = 11;
const MOVIE_BUFF_MIN_QUANTITY = 21;

const getUserStatus = (films) => {
  const quantityWatchedFilms = films.filter((film) => film.userDetails.alreadyWatched).length;
  let status = ``;
  if (quantityWatchedFilms >= NOVICE_MIN_QUANTITY && quantityWatchedFilms < FAN_MIN_QUANTITY) {
    status = UserStatus.NOVICE;
  } else if (quantityWatchedFilms >= FAN_MIN_QUANTITY && quantityWatchedFilms < MOVIE_BUFF_MIN_QUANTITY) {
    status = UserStatus.FAN;
  } else if (quantityWatchedFilms >= MOVIE_BUFF_MIN_QUANTITY) {
    status = UserStatus.MOVIE_BUFF;
  }
  return status;
};

const getAllGenresWithQuantity = (films) => {
  const watchedFilmsGenres = films.map((e) => e.filmInfo.genres);
  const allGenres = watchedFilmsGenres.reduce((r, e) => (r.push(...e), r), []);
  const genresWithQuantity = {};
  allGenres.forEach((a) => {
    genresWithQuantity[a] = genresWithQuantity[a] + 1 || 1;
  });
  return genresWithQuantity;
};

const calculateTotalDurationOfFilms = (films) => {
  const duration = films.map((e) => e.filmInfo.duration);
  let totalDuration = 0;
  for (let i = 0; i < duration.length; i++) {
    totalDuration += duration[i];
  }
  return totalDuration;
};

const getPopularGenre = (films) => {
  const genres = getAllGenresWithQuantity(films);
  const value = Math.max.apply(Math, Object.values(genres));
  return Object.keys(genres).find((key) => genres[key] === value);
};

export {getUserStatus, getAllGenresWithQuantity, calculateTotalDurationOfFilms, getPopularGenre};
