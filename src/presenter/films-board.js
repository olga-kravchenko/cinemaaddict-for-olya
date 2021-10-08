import SortingView from "../view/sorting";
import ContentView from "../view/content";
import NoFilmsView from "../view/no-films";
import FilmsView from "../view/films";
import FilmsContainerView from "../view/films-container";
import ShowMoreButtonView from "../view/show-more-button";
import FilmPresenter from "./film";
import {remove, render, RenderPosition} from "../utils/render";
import {sortFilmsByDate, sortFilmsByRating} from "../utils/util";
import {FilterType, SortType, UpdateType, UserAction} from "../constants";
import {Filter} from "../utils/filter";

const FILM_QUANTITY_PER_STEP = 5;

class FilmsBoard {
  constructor(container, filmsModel, filterModel, statsComponent) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._statsComponent = statsComponent;
    this._renderedFilmsQuantity = FILM_QUANTITY_PER_STEP;
    this._filmPresenters = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortingComponent = null;
    this._showMoreButtonComponent = null;

    this._contentContainerComponent = new ContentView();
    this._filmListComponent = new FilmsView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsBoard();
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = Filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return [...filteredFilms].sort(sortFilmsByDate).reverse();
      case SortType.RATING:
        return [...filteredFilms].sort(sortFilmsByRating).reverse();
    }
    return filteredFilms;
  }

  destroy() {
    this._clearFilmsBoard({resetRenderedFilmQuantity: true, resetSortType: true});
    remove(this._filmListComponent);
    remove(this._contentContainerComponent);
    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _handleViewAction(updateType, actionType, updatedFilm) {
    switch (actionType) {
      case UserAction.UPDATE_FILMS:
        if (this._filterModel.getFilter() === FilterType.ALL) {
          updateType = UpdateType.PATCH;
        } else {
          updateType = UpdateType.MAJOR;
        }
        this._filmsModel.updateFilm(updateType, updatedFilm);
        this._statsComponent.updateState(this._filmsModel.getFilms(), false);
        this._statsComponent.hide();
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.updateFilm(updateType, updatedFilm);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateFilm(updateType, updatedFilm);
        break;
    }
  }

  _handleModelEvent(updateType, film) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenters[film.id].initOrUpdate(film);
        break;
      case UpdateType.MINOR:
        this._clearFilmsBoard();
        this._renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsBoard({resetRenderedFilmQuantity: true, resetSortType: true});
        this._renderFilmsBoard();
        break;
    }
  }

  _handleShowMoreButtonClick() {
    const filmQuantity = this._getFilms().length;
    const newRenderedFilmQuantity = Math.min(filmQuantity, this._renderedFilmsQuantity + FILM_QUANTITY_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmsQuantity, newRenderedFilmQuantity);

    this._renderFilms(films);
    this._renderedFilmsQuantity = newRenderedFilmQuantity;

    if (this._renderedFilmsQuantity >= filmQuantity) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleSortTypeClick(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmsBoard({resetRenderedFilmQuantity: true, resetSortType: false});
    this._renderFilmsBoard();
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }
    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeClick);
    render(this._container, this._sortingComponent, RenderPosition.BEFORE_END);
  }

  _renderNoFilms() {
    render(this._contentContainerComponent, this._noFilmsComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderFilmContainer() {
    render(this._filmListComponent, this._filmContainerComponent, RenderPosition.BEFORE_END);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmContainerComponent, this._handleViewAction);
    filmPresenter.initOrUpdate(film);
    this._filmPresenters[film.id] = filmPresenter;
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFORE_END);
  }

  _renderFilmsBoard() {
    const films = this._getFilms();
    const filmQuantity = films.length;
    this._renderSorting();
    render(this._container, this._contentContainerComponent, RenderPosition.BEFORE_END);
    render(this._contentContainerComponent, this._filmListComponent, RenderPosition.BEFORE_END);
    if (!filmQuantity) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmContainer();
    this._renderFilms(films.slice(0, Math.min(filmQuantity, FILM_QUANTITY_PER_STEP)));
    if (filmQuantity > this._renderedFilmsQuantity) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmsBoard({resetRenderedFilmQuantity = false, resetSortType = false} = {}) {
    const filmQuantity = this._getFilms().length;
    remove(this._sortingComponent);
    Object
      .values(this._filmPresenters)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenters = {};
    remove(this._noFilmsComponent);
    remove(this._showMoreButtonComponent);
    if (resetRenderedFilmQuantity) {
      this._renderedFilmsQuantity = FILM_QUANTITY_PER_STEP;
    } else {
      this._renderedFilmsQuantity = Math.min(filmQuantity, this._renderedFilmsQuantity);
    }
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}

export default FilmsBoard;
