import dayjs from "dayjs";
import {formatTime} from "../utils/util";
import {EMOTIONS} from "../constants";
import Abstract from "./abstract";

const createFilmControlsTemplate = ({watchlist, alreadyWatched, favorite}) => {
  const isCheckedWatchlist = watchlist ? `checked` : ``;
  const isCheckedAlreadyWatched = alreadyWatched ? `checked` : ``;
  const isCheckedFavorites = favorite ? `checked` : ``;

  return `
   <section class="film-details__controls">
     <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isCheckedWatchlist}>
     <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

     <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isCheckedAlreadyWatched}>
     <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

     <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isCheckedFavorites}>
     <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`;
};

const createCommentsTemplate = (comments) => comments.map(({author, comment, date, emotion}) => `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dayjs(date).format(`YYYY/MM/DD H:mm`)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`).join(``);

const createCommentListTemplate = (comments) => `
    ${comments.length !== 0 ? `
    <ul class="film-details__comments-list">
      ${createCommentsTemplate(comments)}
    </ul>` :
    ``}`;

const createEmojisTemplate = () => EMOTIONS.map((emotion) => `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`).join(``);

const createEmojiListTemplate = () => `
    <div class="film-details__emoji-list">
      ${createEmojisTemplate()}
    </div>`;

const createPopupTemplate = ({filmInfo, comments, userDetails}) => {
  const {
    poster,
    title,
    originalTitle,
    rating,
    duration,
    description,
    director,
    screenwriters,
    actors,
    date,
    country,
    genres,
    ageRating,
  } = filmInfo;

  const formattedDuration = formatTime(duration);
  const releaseDate = dayjs(date).format(` DD MMMM YYYY`);
  const shownGeneres = genres.map((e) => `<span class="film-details__genre">${e}</span>`);
  const genreTitle = shownGeneres.length === 1 ? `Genre` : `Genres`;

  return `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${screenwriters.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formattedDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genreTitle}</td>
                  <td class="film-details__cell">
                  ${shownGeneres.join(` `)}
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>
              ${createFilmControlsTemplate(userDetails)}
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            ${createCommentListTemplate(comments)}

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              ${createEmojiListTemplate(comments)}
            </div>
          </section>
        </div>
      </form>
  </section>`;
};

class Popup extends Abstract {
  constructor(film) {
    super();
    this._film = film;

    this._popupCloseClickHandler = this._popupCloseClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  _popupCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupClose();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setPopupCloseHandler(callback) {
    this._callback.popupClose = callback;
    const closeButton = this.getElement().querySelector(`.film-details__close-btn`);
    closeButton.addEventListener(`click`, this._popupCloseClickHandler);
  }

  setPopupWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    const button = this.getElement().querySelector(`#watchlist`);
    button.addEventListener(`change`, this._watchlistClickHandler);
  }

  setPopupAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    const button = this.getElement().querySelector(`#watched`);
    button.addEventListener(`change`, this._alreadyWatchedClickHandler);
  }

  setPopupFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    const button = this.getElement().querySelector(`#favorite`);
    button.addEventListener(`change`, this._favoriteClickHandler);
  }
}

export default Popup;
