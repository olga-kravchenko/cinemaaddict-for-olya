import MenuView from "../view/menu";
import {RenderPosition} from "../utils/render";
import {render, replace, remove} from "../utils/render";
import {UpdateType, FilterType} from "../constants";
import {filter} from "../utils/filter";

export default class Menu {
  constructor(menuContainer, filterModel, filmsModel, filmBoardPresenter, statsComponent) {
    this._menuContainer = menuContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._filmBoardPresenter = filmBoardPresenter;
    this._currentFilter = null;
    this._statsComponent = statsComponent;
    this._menuComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeClick = this._handleFilterTypeClick.bind(this);
    this._handleStatsClick = this._handleStatsClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();
    const prevFilterComponent = this._menuComponent;

    this._menuComponent = new MenuView(filters, this._currentFilter);

    this._menuComponent.setFilterTypeClickHandler(this._handleFilterTypeClick);
    this._menuComponent.setStatsClickHandler(this._handleStatsClick);

    if (prevFilterComponent === null) {
      render(this._menuContainer, this._menuComponent, RenderPosition.BEFORE_END);
      return;
    }

    replace(this._menuComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeClick(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }
    if (!this._statsComponent.getElement().classList.contains(`visually-hidden`)) {
      this._statsComponent.hide();
      this.init();
      this._filmBoardPresenter.init();
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleStatsClick() {
    this._statsComponent.show();
    this._filmBoardPresenter.destroy();
    this._currentFilter = null;
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();
    return [
      {
        type: FilterType.ALL,
        name: `All movies`,
        quantity: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        quantity: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        quantity: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        quantity: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
