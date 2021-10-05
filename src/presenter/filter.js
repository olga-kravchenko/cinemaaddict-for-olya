import MenuView from "../view/menu";
import StatsView from "../view/stats";
import {RenderPosition} from "../utils/render";
import {render, replace, remove} from "../utils/render";
import {UpdateType, FilterType} from "../constants";
import {filter} from "../utils/filter";

export default class Filter {
  constructor(menuContainer, filterModel, filmsModel, filmBoardPresenter) {
    this._menuContainer = menuContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._filmBoardPresenter = filmBoardPresenter;
    this._currentFilter = null;

    this._menuComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatsClickChange = this._handleStatsClickChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._menuComponent;

    this._menuComponent = new MenuView(filters, this._currentFilter);
    this._statsComponent = new StatsView();
    this._menuComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._menuComponent.setStatsClickHandler(this._handleStatsClickChange);

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

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleStatsClickChange() {
    this._currentFilter = null;
    this._filmBoardPresenter.destroy();
    render(this._menuContainer, this._statsComponent, RenderPosition.BEFORE_END);
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
