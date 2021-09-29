import SortingView from "../view/sorting";
import ContentView from "../view/content";
import NoFilmsView from "../view/no-films";
import FilmsView from "../view/films";
import FilmsContainerView from "../view/films-container";
import ShowMoreButtonView from "../view/show-more-button";
import FilmPresenter from "./film";
import {remove, render, RenderPosition} from "../utils/render";
import {updateElementInArrayByIndex, sortFilmsByDate, sortFilmsByRating} from "../utils/util";
import {SortType} from "../constants";

const FILM_QUANTITY_PER_STEP = 5;

class FilmsBoard {
  constructor(container) {
    this._container = container;
    this._renderedFilmsQuantity = FILM_QUANTITY_PER_STEP;
    this._filmPresenters = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortingComponent = new SortingView(this._currentSortType);
    this._contentContainerComponent = new ContentView();
    this._filmListComponent = new FilmsView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = [...films];
    this._sourcedFilms = [...films];

    this._renderFilmsBoard();
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateElementInArrayByIndex(this._films, updatedFilm);
    this._filmPresenters[updatedFilm.id].initOrUpdate(updatedFilm);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmsQuantity, this._renderedFilmsQuantity + FILM_QUANTITY_PER_STEP);
    this._renderedFilmsQuantity += FILM_QUANTITY_PER_STEP;
    if (this._renderedFilmsQuantity >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmsByDate).reverse();
        break;
      case SortType.RATING:
        this._films.sort(sortFilmsByRating).reverse();
        break;
      default:
        this._films = [...this._sourcedFilms];
    }
    this._currentSortType = sortType;
  }

  _clearFilmList() {
    Object.values(this._filmPresenters)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenters = {};
    this._renderedFilmsQuantity = FILM_QUANTITY_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderSorting() {
    render(this._container, this._sortingComponent, RenderPosition.BEFORE_END);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoFilms() {
    render(this._contentContainerComponent, this._noFilmsComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderFilmContainer() {
    render(this._filmListComponent, this._filmContainerComponent, RenderPosition.BEFORE_END);
  }

  _renderFilms(from, to) {
    this._films.slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmContainerComponent, this._handleFilmChange);
    filmPresenter.initOrUpdate(film);
    this._filmPresenters[film.id] = filmPresenter;
  }

  _renderShowMoreButton() {
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFORE_END);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    const minFilmQuantityPerStep = Math.min(this._films.length, FILM_QUANTITY_PER_STEP);
    this._renderFilms(0, minFilmQuantityPerStep);
    if (this._films.length > FILM_QUANTITY_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    this._renderSorting();
    render(this._container, this._contentContainerComponent, RenderPosition.BEFORE_END);
    render(this._contentContainerComponent, this._filmListComponent, RenderPosition.BEFORE_END);
    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmContainer();
    this._renderFilmList();
  }
}

export default FilmsBoard;
