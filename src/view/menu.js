import Abstract from "./abstract";

const createFiltersTemplate = (filters, currentFilterType) => {
  const filtersTemplate = filters.map(({type, name, quantity}) => `
      <a href="#${type}" class="main-navigation__item ${currentFilterType === name ? `main-navigation__item--active` : ``}">
        ${name}
        ${currentFilterType === name ? `` : `<span class="main-navigation__item-count">${quantity}</span>` }
      </a>`);
  return filtersTemplate.join(``);
};

const createMenuTemplate = (filters, currentFilterType) => `
    <nav class="main-navigation">
      <div class="main-navigation__items">
<!--        <a href="#all" class="main-navigation__item main-navigation__item&#45;&#45;active">All movies</a>-->
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
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this.getElement().querySelectorAll(`.main-navigation__item--active`)
      .forEach((e) => e.classList.remove(`main-navigation__item--active`));
    evt.target.value.classList.add(`main-navigation__item--active`);
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}

export default Menu;
