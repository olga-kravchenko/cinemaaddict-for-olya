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

const getAllGenresToQuantity = (films) => {
  const allGenres = films.map((film) => film.filmInfo.genres).flat();
  const genresToQuantity = new Map();
  allGenres.forEach((genre) => {
    const quantity = genresToQuantity.has(genre) ? genresToQuantity.get(genre) + 1 : 1;
    genresToQuantity.set(genre, quantity);
  });
  return genresToQuantity;
};

const calculateTotalDurationOfFilms = (films) => {
  const duration = films.map((film) => film.filmInfo.duration);
  return films.length ?
    duration.reduce((previousDuration, currentDuration) => previousDuration + currentDuration)
    : 0;
};

const getPopularGenre = (films) => {
  const genres = getAllGenresToQuantity(films);
  return films.length ?
    [...genres.entries()].reduce((previousGenre, currentGenre) => {
      return currentGenre[1] > previousGenre[1] ?
        currentGenre :
        previousGenre;
    })[0] :
    0;
};

export {getUserStatus, getAllGenresToQuantity, calculateTotalDurationOfFilms, getPopularGenre};
