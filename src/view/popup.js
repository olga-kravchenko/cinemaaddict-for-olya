import dayjs from "dayjs";
import he from "he";
import {copyFilm, formatTime, convertFormat} from "../utils/util";
import {EMOTIONS} from "../constants";
import SmartView from "./smart";

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

const createCommentsTemplate = (newComments, idDeleting) => {
  return newComments.map(({id, author, comment, date, emotion}) => {
    const commentDate = new Date(date);
    const dayDifference = -(dayjs(commentDate).diff(dayjs().toDate()));
    const format = convertFormat(dayDifference);
    return `<li class="film-details__comment" id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${format}</span>
          <button class="film-details__comment-delete" ${idDeleting === id ? `disabled` : ``}>
            ${idDeleting === id ? `Deleting...` : `Delete`}
          </button>
        </p>
      </div>
    </li>`;
  }).join(``);
};

const createCommentListTemplate = (newComments, idDeleting) => `
    ${newComments.length !== 0 ? `
    <ul class="film-details__comments-list">
      ${createCommentsTemplate(newComments, idDeleting)}
    </ul>` :
    ``}`;

const createEmojisTemplate = (isSaving) => EMOTIONS.map((emotion) => `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${isSaving ? `disabled` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`)
  .join(``);

const createEmojiListTemplate = (isSaving) => `
    <div class="film-details__emoji-list">
      ${createEmojisTemplate(isSaving)}
    </div>`;

const createPopupTemplate = (film, filmComments) => {
  const {filmInfo, userDetails, isSaving, idDeleting} = film;
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
    release: {date, country},
    genres,
    ageRating,
  } = filmInfo;

  const formattedDuration = formatTime(duration);
  const releaseDate = dayjs(date).format(` DD MMMM YYYY`);
  const shownGeneres = genres.map((e) => `<span class="film-details__genre">${e}</span>`);
  const genreTitle = shownGeneres.length === 1 ? `Genre` : `Genres`;
  const commentQuantity = filmComments.length;
  const comments = createCommentListTemplate(filmComments, idDeleting);

  return `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
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
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentQuantity}</span></h3>
            ${comments}

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="${isSaving ? `Saving...` : `Select reaction below and write comment here`}" name="comment" ${isSaving ? `disabled` : ``}></textarea>
              </label>
              ${createEmojiListTemplate(isSaving)}
            </div>
          </section>
        </div>
      </form>
  </section>`;
};

class Popup extends SmartView {
  constructor(film, filmComments = []) {
    super(film);
    this._emotionState = null;
    this._filmComments = filmComments;

    this.data.isSaving = false;
    this.data.idDeleting = null;

    this._popupCloseClickHandler = this._popupCloseClickHandler.bind(this);

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._checkedTypeToggleHandler = this._checkedTypeToggleHandler.bind(this);
    this._commentAddHandler = this._commentAddHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);

    this.setHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this.data, this._filmComments);
  }

  restoreHandlers() {
    this.setHandlers();
  }

  setHandlers() {
    this._setClickEmojiHandler();
    this._setCommentAddHandler();
    this._setCommentDeleteHandler();

    this._setPopupWatchlistClickHandler();
    this._setPopupAlreadyWatchedClickHandler();
    this._setPopupFavoriteClickHandler();
  }

  _checkedTypeToggleHandler(evt) {
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

  _watchlistClickHandler() {
    const updatedFilm = copyFilm(this.data);
    updatedFilm.userDetails.watchlist = !this.data.userDetails.watchlist;
    this.updateState(updatedFilm, false);
  }

  _alreadyWatchedClickHandler() {
    const updatedFilm = copyFilm(this.data);
    updatedFilm.userDetails.alreadyWatched = !this.data.userDetails.alreadyWatched;
    updatedFilm.userDetails.watchingDate = updatedFilm.userDetails.alreadyWatched === true ? dayjs().toDate() : ``;
    this.updateState(updatedFilm, false);
  }

  _favoriteClickHandler() {
    const updatedFilm = copyFilm(this.data);
    updatedFilm.userDetails.favorite = !this.data.userDetails.favorite;
    this.updateState(updatedFilm, false);
  }

  _commentAddHandler(evt) {
    const commentText = evt.target.value;
    if (evt.ctrlKey && evt.key === `Enter` && commentText && this._emotionState) {
      const comment = {};
      comment.comment = commentText;
      comment.date = dayjs().toDate();
      comment.emotion = this._emotionState;
      this._callback.addComment(this.data, comment);
      this._filmComments.push(comment);
      this._emotionState = null;
    }
  }

  _popupCloseClickHandler() {
    const data = Object.assign({}, copyFilm(this.data));
    this._callback.popupClose(data);
  }

  _commentDeleteHandler(evt) {
    let isDeleteButton = evt.target.classList.contains(`film-details__comment-delete`);
    if (isDeleteButton) {
      const currentScroll = document.querySelector(`.film-details`).scrollTop;
      const id = evt.target.closest(`li`).id;
      this._callback.deleteComment(id, this.data);

      const newFilm = copyFilm(this.data);
      newFilm.idDeleting = null;
      newFilm.comments = newFilm.comments.filter((commentId) => commentId !== id);
      this._filmComments = this._filmComments.filter((comment) => comment.id !== id);
      this.updateState(newFilm, true);

      this.getElement()
        .querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, this._popupCloseClickHandler);
      this.getElement().scrollTo(0, currentScroll);
    }
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

  _setCommentAddHandler() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, this._commentAddHandler);
  }

  setPopupCloseHandler(callback) {
    this._callback.popupClose = callback;
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._popupCloseClickHandler);
  }

  _setCommentDeleteHandler() {
    const comments = this.getElement().querySelector(`.film-details__comments-list`);
    if (comments) {
      comments.addEventListener(`click`, this._commentDeleteHandler);
    }
  }

  setCommentDeleteHandler(callback) {
    this._callback.deleteComment = callback;
  }

  setCommentAddHandler(callback) {
    this._callback.addComment = callback;
  }
}

export default Popup;
