import ContentView from "../view/content";
import FilmsView from "../view/films";
import FilmsContainerView from "../view/films-container";
import ShowMoreButtonView from "../view/show-more-button";
import ExtraFilmsContainerView from "../view/extra-films-container";
import {remove, render, RenderPosition} from "../utils/render";
import {updateItem, sortFilmDate, sortFilmRating} from "../utils/util";
import NoFilmsView from "../view/no-films";
import FilmPresenter from "./film";
import SortingView from "../view/sorting";
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
    this._filmsListComponent = new FilmsView();
    this._noFilms = new NoFilmsView();
    this._filmContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    // this._ratedContainerComponent = new ExtraFilmsContainerView(`Top rated`);
    // this._commentedContainerComponent = new ExtraFilmsContainerView(`Top commented`);

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films;
    this._sourcedFilms = [...films];
    // this._ratedFilms = [...films].sort(sortFilmRating).reverse();
    // this._commentedFilms = [...films].sort((a, b) => a.comments.length - b.comments.length).reverse();

    this._renderFilmsBoard();
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmPresenters[updatedFilm.id].init(updatedFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmDate).reverse();
        break;
      case SortType.RATING:
        this._films.sort(sortFilmRating).reverse();
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);

    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSorting() {
    render(this._container, this._sortingComponent, RenderPosition.BEFORE_END);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoFilms() {
    render(this._contentContainerComponent, this._noFilms, RenderPosition.AFTER_BEGIN);
  }

  _renderFilmContainer() {
    render(this._filmsListComponent, this._filmContainerComponent, RenderPosition.BEFORE_END);
  }

  // _renderExtraContainers() {
  //   const filmRatedContainerComponent = new FilmsContainerView();
  //   const filmCommentedContainerComponent = new FilmsContainerView();
  //   render(this._contentContainerComponent, this._ratedContainerComponent, RenderPosition.BEFORE_END);
  //   render(this._contentContainerComponent, this._commentedContainerComponent, RenderPosition.BEFORE_END);
  //
  //   render(this._ratedContainerComponent, filmRatedContainerComponent, RenderPosition.BEFORE_END);
  //   render(this._commentedContainerComponent, filmCommentedContainerComponent, RenderPosition.BEFORE_END);
  //   // this._renderFilms(0, 2, this._ratedFilms, filmRatedContainerComponent);
  //   // this._renderFilms(0, 2, this._commentedFilms, filmCommentedContainerComponent);
  // }

  _renderFilms(from, to, films, container) {
    films.slice(from, to).forEach((film) => this._renderFilm(film, container));
  }

  _renderFilm(film, container) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenters[film.id] = filmPresenter;
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

  _clearFilmList() {
    Object.values(this._filmPresenters).forEach((presenter) => presenter.destroy());
    this._filmPresenters = {};
    this._renderedFilmsQuantity = FILM_QUANTITY_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._films.length, FILM_QUANTITY_PER_STEP), this._films, this._filmContainerComponent);

    if (this._films.length > FILM_QUANTITY_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    this._renderSorting();

    render(this._container, this._contentContainerComponent, RenderPosition.BEFORE_END);
    render(this._contentContainerComponent, this._filmsListComponent, RenderPosition.BEFORE_END);

    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmContainer();
    this._renderFilmList();
    // this._renderExtraContainers();
  }
}

export default FilmsBoard;
