import dayjs from "dayjs";
import {copyFilm, formatTime} from "../utils/util";
import {EMOTIONS} from "../constants";
import SmartView from "./smart";
import {IdToMap} from "../mock/film";
import {nanoid} from "nanoid";

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

const createCommentsTemplate = (newComments) => {
  return newComments.map(({id, author, comment, date, emotion}) => `<li class="film-details__comment" id="${id}">
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
};

const createCommentListTemplate = (newComments) => `
    ${newComments.length !== 0 ? `
    <ul class="film-details__comments-list">
      ${createCommentsTemplate(newComments)}
    </ul>` :
    ``}`;

const createEmojisTemplate = () => EMOTIONS.map((emotion) => `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`)
  .join(``);

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
  const newComments = comments.map((id) => IdToMap.get(id));

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
            ${createCommentListTemplate(newComments)}

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              ${createEmojiListTemplate()}
            </div>
          </section>
        </div>
      </form>
  </section>`;
};

class Popup extends SmartView {
  constructor(film) {
    super(film);
    this._emotionState = null;

    this._popupCloseClickHandler = this._popupCloseClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._checkedTypeToggleHandler = this._checkedTypeToggleHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);

    this.setHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data);
  }

  restoreHandlers() {
    this.setHandlers();
  }

  setHandlers() {
    this._setClickEmojiHandler();
    this._setPopupWatchlistClickHandler();
    this._setPopupAlreadyWatchedClickHandler();
    this._setPopupFavoriteClickHandler();
  }

  _checkedTypeToggleHandler(evt) {
    evt.preventDefault();
    let type = ``;
    if (evt.target.tagName === `INPUT`) {
      const inputs = document.querySelectorAll(`.film-details__emoji-item`);
      inputs.forEach((e) => e.removeAttribute(`checked`));
      evt.target.setAttribute(`checked`, `checked`);
      type = evt.target.value;
      this._emotionState = type;
      document.querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="./images/emoji/${type}.png" width="55" height="55" alt="emoji-${type}">`;
      document.querySelector(`.film-details__comment-input`).focus();
    }
  }

  _setClickEmojiHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._checkedTypeToggleHandler);
  }

  _popupCloseClickHandler(evt) {
    evt.preventDefault();
    const data = Object.assign({}, copyFilm(this._data));
    this._callback.popupClose(data);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    const updatedFilm = copyFilm(this._data);
    updatedFilm.userDetails.watchlist = !this._data.userDetails.watchlist;
    this.updateState(updatedFilm, false);
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    const updatedFilm = copyFilm(this._data);
    updatedFilm.userDetails.alreadyWatched = !this._data.userDetails.alreadyWatched;
    this.updateState(updatedFilm, false);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    const updatedFilm = copyFilm(this._data);
    updatedFilm.userDetails.favorite = !this._data.userDetails.favorite;
    this.updateState(updatedFilm, false);
  }

  _commentSubmitHandler(evt) {
    const commentText = evt.target.value;
    if (evt.ctrlKey && evt.key === `Enter` && commentText && this._emotionState) {
      evt.preventDefault();
      const comment = {};
      comment.id = nanoid();
      comment.author = `You`;
      comment.comment = commentText;
      comment.date = dayjs().toDate();
      comment.emotion = this._emotionState;

      const newFilm = copyFilm(this._data);
      newFilm.comments.push(comment.id);
      IdToMap.set(comment.id, comment);
      this._emotionState = null;
      this._callback.formSubmit(newFilm);
    }
  }

  setPopupCloseHandler(callback) {
    this._callback.popupClose = callback;
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._popupCloseClickHandler);
  }

  _setPopupWatchlistClickHandler() {
    this.getElement()
      .querySelector(`#watchlist`)
      .addEventListener(`change`, this._watchlistClickHandler);
  }

  _setPopupAlreadyWatchedClickHandler() {
    this.getElement()
      .querySelector(`#watched`)
      .addEventListener(`change`, this._alreadyWatchedClickHandler);
  }

  _setPopupFavoriteClickHandler() {
    this.getElement()
      .querySelector(`#favorite`)
      .addEventListener(`change`, this._favoriteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, this._commentSubmitHandler);
  }
}

export default Popup;
