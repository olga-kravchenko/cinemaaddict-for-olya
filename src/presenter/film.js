import FilmView from "../view/film";
import PopupView from "../view/popup";
import {render, RenderPosition} from "../utils/render";

class Film {
  constructor(container) {
    this._container = container;
    this._body = document.querySelector(`body`);

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmComponent = new FilmView(film);
    this._filmPopupComponent = new PopupView(film);

    this._filmComponent.setCardClickHandler(this._onFilmCardClick);
    this._filmPopupComponent.setPopupCloseHandler(this._onCloseButtonClick);

    render(this._container, this._filmComponent, RenderPosition.BEFORE_END);
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

  _onCloseButtonClick() {
    this._closePopup();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

export default Film;
