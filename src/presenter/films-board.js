import ContentView from "../view/content";
import FilmsView from "../view/films";
import FilmsContainerView from "../view/films-container";
import ShowMoreButtonView from "../view/show-more-button";
import ExtraFilmsContainerView from "../view/extra-films-container";
import {remove, render, RenderPosition} from "../utils/render";
import NoFilmsView from "../view/no-films";
import FilmPresenter from "./film";

const FILM_QUANTITY_PER_STEP = 5;

class FilmsBoard {
  constructor(container) {
    this._container = container;
    this._renderedFilmsQuantity = FILM_QUANTITY_PER_STEP;

    this._contentContainerComponent = new ContentView();
    this._filmsListComponent = new FilmsView();
    this._noFilms = new NoFilmsView();
    this._filmContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._ratedContainerComponent = new ExtraFilmsContainerView(`Top rated`);
    this._commentedContainerComponent = new ExtraFilmsContainerView(`Top commented`);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
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
    const filmPresenter = new FilmPresenter(container);
    filmPresenter.init(film);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmsQuantity, this._renderedFilmsQuantity + FILM_QUANTITY_PER_STEP, this._films, this._filmContainerComponent);
    this._renderedFilmsQuantity += FILM_QUANTITY_PER_STEP;

    if (this._renderedFilmsQuantity >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFORE_END);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
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
