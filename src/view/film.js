import {formatTime} from "../utils/util";
import dayjs from "dayjs";
import {EMPTY_STRING} from "../constants";
import AbstractView from "./abstract";

const MIN_SYMBOL_QUANTITY = 0;
const MAX_SYMBOL_QUANTITY = 140;

const createDescription = (sentences) => {
  const description = sentences.join(` `);
  const descriptionLength = description.length;
  return descriptionLength < MAX_SYMBOL_QUANTITY ?
    description : description.substring(MIN_SYMBOL_QUANTITY, MAX_SYMBOL_QUANTITY) + `...`;
};

const createFilmTemplate = ({filmInfo, comments, userDetails}) => {
  const {poster, title, rating, duration, description, date, genre} = filmInfo;
  const {watchlist, alreadyWatched, favorite} = userDetails;
  const time = formatTime(duration);
  const year = dayjs(date).format(`YYYY`);

  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${time}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${createDescription(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : EMPTY_STRING}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? `film-card__controls-item--active` : EMPTY_STRING}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite  ${favorite ? `film-card__controls-item--active` : EMPTY_STRING}" type="button">Mark as favorite</button>
      </div>
    </article>`;
};

class FilmView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._cardClickHandler = this._cardClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick();
  }

  setCardClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._cardClickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._cardClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._cardClickHandler);
  }
}

export default FilmView;


