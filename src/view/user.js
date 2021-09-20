import {UserStatus} from "../mock/film";

const getUserStatus = (films) => {
  const quantityWatchedFilms = films.filter((film) => !film.userDetails.watchlist).length;
  let status = ``;

  if (quantityWatchedFilms >= 1 && quantityWatchedFilms <= 10) {
    status = UserStatus.NOVICE;
  } else if (quantityWatchedFilms >= 11 && quantityWatchedFilms <= 20) {
    status = UserStatus.FAN;
  } else if (quantityWatchedFilms >= 21) {
    status = UserStatus.MOVIE_BUFF;
  } else if (quantityWatchedFilms === 0) {
    status = ``;
  }

  return status;
};

const createUserTemplate = (films) => {
  const status = getUserStatus(films);
  return `
    <section class="header__profile profile">
        ${status !== `` ? `<p class="profile__rating">${status}</p>` : ``}
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export {createUserTemplate};
