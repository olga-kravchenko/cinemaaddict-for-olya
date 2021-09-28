import FilmView from "../view/film";
import PopupView from "../view/popup";
import {render, RenderPosition, remove, replace} from "../utils/render";

class Film {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;
    this._body = document.querySelector(`body`);

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._filmPopupComponent;

    this._filmComponent = new FilmView(film);
    this._filmPopupComponent = new PopupView(film);

    this._filmComponent.setCardClickHandler(this._onFilmCardClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmPopupComponent.setPopupCloseHandler(this._onCloseButtonClick);


    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this._container, this._filmComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._container.getElement().contains(prevPopupComponent.getElement())) {
      replace(this._filmPopupComponent, prevPopupComponent);
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

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onFilmCardClick() {
    this._showPopup();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleWatchlistClick() {
    const newFilm = Object.assign({}, this._film);
    newFilm.userDetails.watchlist = !this._film.userDetails.watchlist;
    this._changeData(newFilm);
  }

  _handleAlreadyWatchedClick() {
    const newFilm = Object.assign({}, this._film);
    newFilm.userDetails.alreadyWatched = !this._film.userDetails.alreadyWatched;
    this._changeData(newFilm);
  }

  _handleFavoriteClick() {
    const newFilm = Object.assign({}, this._film);
    newFilm.userDetails.favorite = !this._film.userDetails.favorite;
    this._changeData(newFilm);
  }

  _onCloseButtonClick() {
    this._closePopup();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

export default Film;
