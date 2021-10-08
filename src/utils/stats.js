import {FilterType, UserStatus} from "../constants";
import {Filter} from "./filter";

const NOVICE_MIN_QUANTITY = 1;
const FAN_MIN_QUANTITY = 11;
const MOVIE_BUFF_MIN_QUANTITY = 21;

const getUserStatus = (films) => {
  const watchedFilmsQuantity = Filter[FilterType.HISTORY](films).length;
  let status = ``;
  if (watchedFilmsQuantity >= NOVICE_MIN_QUANTITY && watchedFilmsQuantity < FAN_MIN_QUANTITY) {
    status = UserStatus.NOVICE;
  } else if (watchedFilmsQuantity >= FAN_MIN_QUANTITY && watchedFilmsQuantity < MOVIE_BUFF_MIN_QUANTITY) {
    status = UserStatus.FAN;
  } else if (watchedFilmsQuantity >= MOVIE_BUFF_MIN_QUANTITY) {
    status = UserStatus.MOVIE_BUFF;
  }
  return status;
};

const getAllGenresWithQuantity = (films) => {
  const watchedFilmsGenres = films.map((f) => f.filmInfo.genres);
  const allGenres = watchedFilmsGenres.reduce((r, e) => (r.push(...e), r), []);
  // const allGenres = watchedFilmsGenres.reduce((a, b) => {
  //   return a.concat(b);
  // });
  const genresWithQuantity = {};
  allGenres.forEach((genre) => {
    genresWithQuantity[genre] = genresWithQuantity[genre] + 1 || 1;
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
