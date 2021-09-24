import ContentView from "../view/content";
import FilmsView from "../view/films";
import FilmsContainerView from "../view/films-container";
import ShowMoreButtonView from "../view/show-more-button";
import ExtraFilmsContainerView from "../view/extra-films-container";
import {remove, render, RenderPosition} from "../utils/render";
import NoFilmsView from "../view/no-films";
import FilmView from "../view/film";
import PopupView from "../view/popup";

const FILM_QUANTITY_PER_STEP = 5;

class FilmsBoard {
  constructor(container) {
    this._container = container;

    this._contentContainerComponent = new ContentView();
    this._filmsListComponent = new FilmsView();
    this._noFilms = new NoFilmsView();
    this._filmContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._ratedContainerComponent = new ExtraFilmsContainerView(`Top rated`);
    this._commentedContainerComponent = new ExtraFilmsContainerView(`Top commented`);
  }

  init(films) {
    this._films = films.slice();
    this._ratedFilms = films.slice().sort((a, b) => a.filmInfo.rating - b.filmInfo.rating).reverse();
    this._commentedFilms = films.slice().sort((a, b) => a.comments.length - b.comments.length).reverse();

    render(this._container, this._contentContainerComponent, RenderPosition.BEFORE_END);
    render(this._contentContainerComponent, this._filmsListComponent, RenderPosition.BEFORE_END);
    this._renderFilmsBoard();
  }

  _renderNoFilms() {
    render(this._contentContainerComponent, this._noFilms, RenderPosition.AFTER_BEGIN);
  }

  _renderFilmContainer() {
    render(this._filmsListComponent, this._filmContainerComponent, RenderPosition.BEFORE_END);
  }

  _renderExtraContainers() {
    render(this._contentContainerComponent, this._ratedContainerComponent, RenderPosition.BEFORE_END);
    render(this._contentContainerComponent, this._commentedContainerComponent, RenderPosition.BEFORE_END);
    const ratedContainer = this._ratedContainerComponent.getElement().querySelector(`.films-list--extra .films-list__container`);
    const commentedContainer = this._commentedContainerComponent.getElement().querySelector(`.films-list--extra .films-list__container`);
    this._renderFilms(0, 2, this._ratedFilms, ratedContainer);
    this._renderFilms(0, 2, this._commentedFilms, commentedContainer);
  }

  _renderFilms(from, to, films, container) {
    films.slice(from, to).forEach((film) => this._renderFilm(film, container));
  }

  _renderFilm(film, container) {
    const body = document.querySelector(`body`);
    const filmComponent = new FilmView(film);
    const filmPopupComponent = new PopupView(film);
    render(container, filmComponent, RenderPosition.BEFORE_END);

    const showPopup = () => {
      if (!document.querySelector(`.film-details`)) {
        body.classList.add(`hide-overflow`);
        body.appendChild(filmPopupComponent.getElement());
      }
    };

    const closePopup = () => {
      body.classList.remove(`hide-overflow`);
      body.removeChild(filmPopupComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onPopupClick = () => {
      showPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onCloseButtonClick = () => {
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    filmComponent.setCardClickHandler(onPopupClick);
    filmPopupComponent.setPopupCloseHandler(onCloseButtonClick);
  }

  _renderShowMoreButton() {
    let renderedTaskCount = FILM_QUANTITY_PER_STEP;
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFORE_END);

    this._showMoreButtonComponent.setClickHandler(() => {
      this._films.slice(renderedTaskCount, renderedTaskCount + FILM_QUANTITY_PER_STEP)
        .forEach((film) => this._renderFilm(film, this._filmContainerComponent));
      renderedTaskCount += FILM_QUANTITY_PER_STEP;
      if (renderedTaskCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._films.length, FILM_QUANTITY_PER_STEP), this._films, this._filmContainerComponent);

    if (this._films.length > FILM_QUANTITY_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmContainer();
    this._renderFilmList();
    this._renderExtraContainers();

  }
}

export default FilmsBoard;
