import dayjs from "dayjs";
import {formatTime} from "../utils/util";
import {EMOTIONS, EMPTY_STRING} from "../constants";
import {createElement} from "../utils/render";

const createGenreTemplate = (genres) => {
  const shownGenres = [];
  genres.forEach((genre) => {
    const template = `<span class="film-details__genre">${genre}</span>`;
    shownGenres.push(template);
  });
  return shownGenres;
};

const createFilmControlsTemplate = ({watchlist, alreadyWatched, favorite}) => {
  return `
   <section class="film-details__controls">
     <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlist ? `checked` : EMPTY_STRING}>
     <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

     <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatched ? `checked` : EMPTY_STRING}>
     <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

     <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? `checked` : EMPTY_STRING}>
     <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`;
};

const createCommentsTemplate = (comments) => {
  const shownComments = [];
  comments.forEach(({author, comment, date, emotion}) => {
    const time = dayjs(date).format(`YYYY/MM/DD H:mm`);
    const template = `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${time}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
    shownComments.push(template);
  });
  return shownComments.join(``);
};

const createCommentListTemplate = (comments) => {
  return `${comments.length !== 0 ? `
    <ul class="film-details__comments-list">
      ${createCommentsTemplate(comments)}
    </ul>` : EMPTY_STRING}`;
};

const createEmojisTemplate = () => {
  const shownEmojis = [];
  EMOTIONS.forEach((emotion) => {
    const template = `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`;
    shownEmojis.push(template);
  });
  return shownEmojis.join(``);
};

const createEmojiListTemplate = () => {
  return `
    <div class="film-details__emoji-list">
      ${createEmojisTemplate()}
    </div>`;
};

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
    genre,
    ageRating,
  } = filmInfo;

  const time = formatTime(duration);
  const releaseDate = dayjs(date).format(` DD MMMM YYYY`);
  const shownGeneres = createGenreTemplate(genre);
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
                  <td class="film-details__cell">${time}</td>
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

class PopupView {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return createPopupTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default PopupView;
