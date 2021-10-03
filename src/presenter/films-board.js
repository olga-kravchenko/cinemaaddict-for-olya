import SortingView from "../view/sorting";
import ContentView from "../view/content";
import NoFilmsView from "../view/no-films";
import FilmsView from "../view/films";
import FilmsContainerView from "../view/films-container";
import ShowMoreButtonView from "../view/show-more-button";
import FilmPresenter from "./film";
import {remove, render, RenderPosition} from "../utils/render";
import {sortFilmsByDate, sortFilmsByRating} from "../utils/util";
import {SortType} from "../constants";

const FILM_QUANTITY_PER_STEP = 5;

class FilmsBoard {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._renderedFilmsQuantity = FILM_QUANTITY_PER_STEP;
    this._filmPresenters = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortingComponent = new SortingView(this._currentSortType);
    this._contentContainerComponent = new ContentView();
    this._filmListComponent = new FilmsView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsBoard();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortFilmsByDate).reverse();
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortFilmsByRating).reverse();
    }
    return this._filmsModel.getFilms();
  }

  // _handleFilmChange(updatedFilm) {
  //   // Здесь будем вызывать обновление модели
  //   this._filmPresenters[updatedFilm.id].initOrUpdate(updatedFilm);
  // }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmsQuantity + FILM_QUANTITY_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmsQuantity, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmsQuantity = newRenderedFilmCount;

    if (this._renderedFilmsQuantity >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderFilmList();
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

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmContainerComponent, this._handleViewAction);
    filmPresenter.initOrUpdate(film);
    this._filmPresenters[film.id] = filmPresenter;
  }

  _renderShowMoreButton() {
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFORE_END);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_QUANTITY_PER_STEP));

    this._renderFilms(films);

    if (filmCount > FILM_QUANTITY_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    const filmCount = this._getFilms().length;
    this._renderSorting();
    render(this._container, this._contentContainerComponent, RenderPosition.BEFORE_END);
    render(this._contentContainerComponent, this._filmListComponent, RenderPosition.BEFORE_END);
    if (!filmCount) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmContainer();
    this._renderFilmList();
  }
}

export default FilmsBoard;
