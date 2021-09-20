import {convertTime} from "../utils/film";
import dayjs from "dayjs";
import {EMPTY_STRING} from "../constants";

const MIN_QUANTITY_SYMBOLS = 0;
const MAX_QUANTITY_SYMBOLS = 140;

const checkDescriptionLength = (description) => {
  let string;
  const descriptionLength = description.join(` `).length;
  if (descriptionLength < MAX_QUANTITY_SYMBOLS) {
    string = description.join(` `);
  } else {
    string = description.join(` `).substring(MIN_QUANTITY_SYMBOLS, MAX_QUANTITY_SYMBOLS) + `...`;
  }
  return string;
};

const createFilmTemplate = ({filmInfo, comments, userDetails}) => {
  const {poster, title, rating, duration, description, date, genre} = filmInfo;
  const {watchlist, alreadyWatched, favorite} = userDetails;
  const time = convertTime(duration);
  const year = dayjs(date).format(`YYYY`);

  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${time}</span>
        <span class="film-card__genre">${genre.join(` `)}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${checkDescriptionLength(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : EMPTY_STRING}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? `film-card__controls-item--active` : EMPTY_STRING}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite  ${favorite ? `film-card__controls-item--active` : EMPTY_STRING}" type="button">Mark as favorite</button>
      </div>
    </article>`;
};

export {createFilmTemplate};
