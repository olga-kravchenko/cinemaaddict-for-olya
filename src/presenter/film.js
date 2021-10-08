import FilmView from "../view/film";
import PopupView from "../view/popup";
import {render, RenderPosition, remove, replace} from "../utils/render";
import {UpdateType, UserAction} from "../constants";
import dayjs from "dayjs";

class Film {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;
    this._body = document.querySelector(`body`);

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._handleAddComment = this._handleAddComment.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
  }

  initOrUpdate(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._filmPopupComponent;

    this._filmComponent = new FilmView(film);
    this._filmPopupComponent = new PopupView(film);

    this._filmComponent.setCardClickHandler(this._handleFilmCardClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmPopupComponent.setPopupCloseHandler(this._handleCloseButtonClick);
    this._filmPopupComponent.setCommentAddHandler(this._handleAddComment);
    this._filmPopupComponent.setCommentDeleteHandler(this._handleDeleteComment);

    if (prevFilmComponent === null) {
      render(this._container, this._filmComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      if (this._body.contains(prevPopupComponent.getElement())) {
        const currentScroll = this._body.querySelector(`.film-details`).scrollTop;
        replace(this._filmPopupComponent, prevPopupComponent);
        this._filmPopupComponent.getElement().scrollTo(0, currentScroll);
      }
      replace(this._filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  _showPopup() {
    if (!document.querySelector(`.film-details`)) {
      this._body.classList.add(`hide-overflow`);
      this._body.appendChild(this._filmPopupComponent.getElement());
    }
  }

  _closePopup() {
    this._body.classList.remove(`hide-overflow`);
    this._body.removeChild(this._filmPopupComponent.getElement());
  }

  _handleEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closePopup();
      this._changeData(UpdateType.PATCH, UserAction.UPDATE_FILMS, this._filmPopupComponent.data);
      document.removeEventListener(`keydown`, this._handleEscKeyDown);
    }
  }

  _handleFilmCardClick() {
    this._showPopup();
    document.addEventListener(`keydown`, this._handleEscKeyDown);
  }

  _handleWatchlistClick() {
    const updatedFilm = Object.assign({}, this._film);
    updatedFilm.userDetails.watchlist = !this._film.userDetails.watchlist;
    this._changeData(UpdateType.PATCH, UserAction.UPDATE_FILMS, updatedFilm);
  }

  _handleAlreadyWatchedClick() {
    const updatedFilm = Object.assign({}, this._film);
    updatedFilm.userDetails.alreadyWatched = !this._film.userDetails.alreadyWatched;
    updatedFilm.userDetails.watchingDate = updatedFilm.userDetails.alreadyWatched === true ? dayjs().toDate() : ``;
    this._changeData(UpdateType.PATCH, UserAction.UPDATE_FILMS, updatedFilm);
  }

  _handleFavoriteClick() {
    const updatedFilm = Object.assign({}, this._film);
    updatedFilm.userDetails.favorite = !this._film.userDetails.favorite;
    this._changeData(UpdateType.PATCH, UserAction.UPDATE_FILMS, updatedFilm);
  }

  _handleCloseButtonClick(updatedFilm) {
    this._closePopup();
    this._changeData(UpdateType.PATCH, UserAction.UPDATE_FILMS, updatedFilm);
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
  }

  _handleAddComment(updatedFilm) {
    this._changeData(UpdateType.PATCH, UserAction.ADD_COMMENT, updatedFilm);
  }

  _handleDeleteComment(updatedFilm) {
    this._changeData(UpdateType.PATCH, UserAction.DELETE_COMMENT, updatedFilm);
  }
}

export default Film;
