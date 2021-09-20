import {UserStatus, EMPTY_STRING} from "../constants";

const NO_MOVIES = 0;
const NOVICE_MIN_QUANTITY = 1;
const NOVICE_MAX_QUANTITY = 10;
const FAN_MIN_QUANTITY = 11;
const FAN_MAX_QUANTITY = 20;
const MOVIE_BUFF_MIN_QUANTITY = 21;

const getUserStatus = (films) => {
  const quantityWatchedFilms = films.filter((film) => !film.userDetails.watchlist).length;
  let status = EMPTY_STRING;

  if (quantityWatchedFilms === NO_MOVIES) {
    status = EMPTY_STRING;
  } else if (quantityWatchedFilms >= NOVICE_MIN_QUANTITY && quantityWatchedFilms <= NOVICE_MAX_QUANTITY) {
    status = UserStatus.NOVICE;
  } else if (quantityWatchedFilms >= FAN_MIN_QUANTITY && quantityWatchedFilms <= FAN_MAX_QUANTITY) {
    status = UserStatus.FAN;
  } else if (quantityWatchedFilms >= MOVIE_BUFF_MIN_QUANTITY) {
    status = UserStatus.MOVIE_BUFF;
  }
  return status;
};

const createUserTemplate = (films) => {
  const status = getUserStatus(films);
  return `
    <section class="header__profile profile">
      ${status !== EMPTY_STRING ? `<p class="profile__rating">${status}</p>` : EMPTY_STRING}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export {createUserTemplate};
