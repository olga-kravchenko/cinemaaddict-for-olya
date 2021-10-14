import {formatTime} from "../utils/util";
import dayjs from "dayjs";
import Abstract from "./abstract";

const formatDescription = (description) => {
  const MIN_SYMBOL_QUANTITY = 0;
  const MAX_SYMBOL_QUANTITY = 140;
  const descriptionLength = description.length;
  return descriptionLength < MAX_SYMBOL_QUANTITY ?
    description :
    description.substring(MIN_SYMBOL_QUANTITY, MAX_SYMBOL_QUANTITY) + `...`;
};

const createFilmTemplate = ({filmInfo, comments, userDetails}) => {
  const {watchlist, alreadyWatched, favorite} = userDetails;
  const {poster, title, rating, duration, description, date, genres} = filmInfo;
  const shownGenre = genres[0];
  const formattedDuration = formatTime(duration);
  const releaseDate = dayjs(date).format(`YYYY`);
  const formattedDescription = formatDescription(description);
  const isActiveWatchlist = watchlist ? `film-card__controls-item--active` : ``;
  const isAlreadyWatched = alreadyWatched ? `film-card__controls-item--active` : ``;
  const isFavorite = favorite ? `film-card__controls-item--active` : ``;

  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate}</span>
        <span class="film-card__duration">${formattedDuration}</span>
        <span class="film-card__genre">${shownGenre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${formattedDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isActiveWatchlist}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isAlreadyWatched}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite}" type="button">Mark as favorite</button>
      </div>
    </article>`;
};

class Film extends Abstract {
  constructor(film) {
    super();
    this._film = film;

    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  _cardClickHandler() {
    this._callback.popupClick();
  }

  _watchlistClickHandler() {
    this._callback.watchlistClick();
  }

  _alreadyWatchedClickHandler() {
    this._callback.alreadyWatchedClick();
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }

  setCardClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement()
      .querySelector(`.film-card__poster`)
      .addEventListener(`click`, this._cardClickHandler);
    this.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, this._cardClickHandler);
    this.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._cardClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._alreadyWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().
    querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }
}

export default Film;
