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

const calculateGenres = (films) => {
  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched);
  const watchedFilmsGenres = watchedFilms.map((e) => e.filmInfo.genres);
  const genres = watchedFilmsGenres.reduce((r, e) => (r.push(...e), r), []);
  const result = {};
  genres.forEach((a) => {
    result[a] = result[a] + 1 || 1;
  });
  return result;
};

const calculateDuration = (watchedFilms) => {
  const duration = watchedFilms.map((e) => e.filmInfo.duration);
  let sum = 0;
  for (let i = 0; i < duration.length; i++) {
    sum += duration[i];
  }
  return sum;
};

const getPopularGenre = (films) => {
  const genres = calculateGenres(films);
  const value = Math.max.apply(Math, Object.values(genres));
  return Object.keys(genres).find((key) => genres[key] === value);
};

export {getUserStatus, calculateGenres, calculateDuration, getPopularGenre};

