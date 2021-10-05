import Abstract from "./abstract";
import {FilterType} from "../constants";

const createFiltersTemplate = (filters, currentFilterType) => {
  const filtersTemplate = filters.map(({type, name, quantity}) => `
      <a href="#${type}" class="main-navigation__item ${currentFilterType === type ? `main-navigation__item--active` : ``}"  data-filter-type="${type}">
        ${name}
        ${type === FilterType.ALL ? `` : `<span class="main-navigation__item-count">${quantity}</span>` }
      </a>`);
  return filtersTemplate.join(``);
};

const createMenuTemplate = (filters, currentFilterType) => `
    <nav class="main-navigation">
      <div class="main-navigation__items">
      ${createFiltersTemplate(filters, currentFilterType)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;

class Menu extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statsClickHandler = this._statsClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this.getElement().querySelectorAll(`.main-navigation__item--active`)
      .forEach((e) => e.classList.remove(`main-navigation__item--active`));
    evt.target.classList.add(`main-navigation__item--active`);
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  _statsClickHandler(evt) {
    this.getElement().querySelectorAll(`.main-navigation__item--active`)
      .forEach((e) => e.classList.remove(`main-navigation__item--active`));
    evt.target.classList.add(`main-navigation__item--active`);
    this._callback.statsClick();
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector(`.main-navigation__items`)
      .addEventListener(`click`, this._filterTypeChangeHandler);
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement().querySelector(`.main-navigation__additional`)
      .addEventListener(`click`, this._statsClickHandler);
  }
}

export default Menu;
