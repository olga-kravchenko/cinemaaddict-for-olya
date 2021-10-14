import {FilterType, UserStatus} from "../constants";
import {Filter} from "./filter";

const NOVICE_MIN_QUANTITY = 1;
const FAN_MIN_QUANTITY = 11;
const MOVIE_BUFF_MIN_QUANTITY = 21;

const getUserStatus = (films) => {
  const watchedFilmQuantity = Filter[FilterType.HISTORY](films).length;
  let status = ``;
  if (watchedFilmQuantity >= NOVICE_MIN_QUANTITY && watchedFilmQuantity < FAN_MIN_QUANTITY) {
    status = UserStatus.NOVICE;
  } else if (watchedFilmQuantity >= FAN_MIN_QUANTITY && watchedFilmQuantity < MOVIE_BUFF_MIN_QUANTITY) {
    status = UserStatus.FAN;
  } else if (watchedFilmQuantity >= MOVIE_BUFF_MIN_QUANTITY) {
    status = UserStatus.MOVIE_BUFF;
  }
  return status;
};

const getAllGenresWithQuantity = (films) => {
  const watchedFilmsGenres = films.map((film) => film.filmInfo.genres);
  const allGenres = watchedFilmsGenres.flat();

  const genresWithQuantity = {};
  allGenres.forEach((genre) => {
    genresWithQuantity[genre] = genresWithQuantity[genre] + 1 || 1;
  });

  const genresToQuantity = new Map();
  allGenres.forEach((genre) => {
    const quantity = genresToQuantity.has(genre) ? genresToQuantity.get(genre) + 1 : 1;
    genresToQuantity.set(genre, quantity);
  });
  console.log(genresToQuantity);
  console.log(genresWithQuantity);
  return genresWithQuantity;
};

const calculateTotalDurationOfFilms = (films) => {
  const duration = films.map((film) => film.filmInfo.duration);
  return films.length ? duration.reduce((a, b) => a + b) : 0;
};

const getPopularGenre = (films) => {
  const genres = getAllGenresWithQuantity(films);
  const value = Math.max.apply(Math, Object.values(genres));
  return Object.keys(genres).find((key) => genres[key] === value);
};

export {getUserStatus, getAllGenresWithQuantity, calculateTotalDurationOfFilms, getPopularGenre};
