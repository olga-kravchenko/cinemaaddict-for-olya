import FilmView from "../view/film";
import PopupView from "../view/popup";
import {render, RenderPosition, remove, replace} from "../utils/render";
import {UpdateType, UserAction} from "../constants";
import dayjs from "dayjs";
import {State} from "../constants";

class Film {
  constructor(container, changeData, provider) {
    this._container = container;
    this._changeData = changeData;
    this._provider = provider;
    this._body = document.querySelector(`body`);
    this._filmComponent = null;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
    this._handleCommentAddClick = this._handleCommentAddClick.bind(this);
  }

  initOrUpdate(film, comments = []) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._filmPopupComponent;

    this._filmComponent = new FilmView(film);
    this._filmPopupComponent = new PopupView(film, comments);

    this._filmComponent.setClickHandler(this._handleFilmCardClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmPopupComponent.setCloseHandler(this._handleCloseButtonClick);
    this._filmPopupComponent.setCommentDeleteHandler(this._handleCommentDeleteClick);
    this._filmPopupComponent.setCommentAddHandler(this._handleCommentAddClick);

    if (!prevFilmComponent) {
      render(this._container, this._filmComponent, RenderPosition.BEFORE_END);
      return;
    }

    const isPrevFilm = this._container.getElement().contains(prevFilmComponent.getElement());
    const isPrevPopupOpen = this._body.contains(prevPopupComponent.getElement());
    if (isPrevFilm) {
      if (isPrevPopupOpen) {
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
    if (!this._body.querySelector(`.film-details`)) {
      let filmComments;
      this._provider.getComments(this._film.id)
        .then((comments) => {
          filmComments = comments;
        })
        .catch(() => {
          filmComments = [];
        })
        .then(() => {
          this._filmPopupComponent = new PopupView(this._film, filmComments);
          this._filmPopupComponent.setCloseHandler(this._handleCloseButtonClick);
          this._filmPopupComponent.setCommentDeleteHandler(this._handleCommentDeleteClick);
          this._filmPopupComponent.setCommentAddHandler(this._handleCommentAddClick);
          this._body.classList.add(`hide-overflow`);
          this._body.appendChild(this._filmPopupComponent.getElement());
          document.addEventListener(`keydown`, this._handleEscKeyDown);
        });
    }
  }

  _closePopup() {
    this._body.classList.remove(`hide-overflow`);
    this._body.removeChild(this._filmPopupComponent.getElement());
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
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
  }

  _handleWatchlistClick() {
    const updatedFilm = Object.assign({}, this._film);
    updatedFilm.userDetails.watchlist = !this._film.userDetails.watchlist;
    this._changeData(UpdateType.PATCH, UserAction.UPDATE_FILMS, updatedFilm);
  }

  _handleAlreadyWatchedClick() {
    const updatedFilm = Object.assign({}, this._film);
    updatedFilm.userDetails.alreadyWatched = !this._film.userDetails.alreadyWatched;
    updatedFilm.userDetails.watchingDate = dayjs().toDate();
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
  }

  _handleCommentDeleteClick(film, commentId, comments) {
    this._changeData(UpdateType.PATCH, UserAction.DELETE_COMMENT, film, null, commentId, comments);
  }

  _handleCommentAddClick(updatedFilm, newComment) {
    this._changeData(UpdateType.PATCH, UserAction.ADD_COMMENT, updatedFilm, newComment);
  }

  setViewState(state, film, commentId, localComment) {
    const currentScroll = document.querySelector(`.film-details`).scrollTop;

    const resetFormState = () => {
      if (localComment) {
        const comment = localComment.comment;
        const emotion = localComment.emotion;
        this._filmPopupComponent.updateState(Object.assign(film, {
          idDeleting: null,
          isSaving: false,
          newComment: {comment, emotion},
        }), true);
      } else {
        const newFilm = Object.assign(film, {idDeleting: null, isSaving: false});
        newFilm.newComment.emotion = null;
        newFilm.newComment.comment = null;
        this._filmPopupComponent.updateState(newFilm, true);
      }
      this._filmPopupComponent.getElement().scrollTo(0, currentScroll);
    };

    switch (state) {
      case State.SAVING:
        const newFilm = Object.assign(film, {isSaving: true});
        newFilm.newComment.emotion = localComment.emotion;
        newFilm.newComment.comment = localComment.comment;
        this._filmPopupComponent.updateState(newFilm, true);
        this._filmPopupComponent.getElement().scrollTo(0, currentScroll);
        break;
      case State.DELETING:
        this._filmPopupComponent.updateState(Object.assign(film, {idDeleting: commentId}), true);
        this._filmPopupComponent.getElement().scrollTo(0, currentScroll);
        break;
      case State.ABORTING:
        const newComment = this._filmPopupComponent.getElement().querySelector(`.film-details__new-comment`);
        if (commentId) {
          const comment = this._filmPopupComponent.getElement().querySelector(`.film-details__comment[id = "${commentId}"]`);
          this._filmPopupComponent.shake(comment, resetFormState);
        } else {
          this._filmPopupComponent.shake(newComment, resetFormState);
        }
        break;
    }
  }
}

export default Film;
