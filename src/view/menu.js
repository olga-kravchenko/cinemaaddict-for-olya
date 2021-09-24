import Abstract from "./abstract";

const createFiltersTemplate = (filters) => {
  const filtersTemplate = filters.map((filter) => `
      <a href="#${filter.name.toLowerCase()}" class="main-navigation__item">
        ${filter.name}
        <span class="main-navigation__item-count">${filter.quantity}</span>
      </a>`);
  return filtersTemplate.join(``);
};

const createMenuTemplate = (filters) => `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${createFiltersTemplate(filters)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;

class Menu extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}

export default Menu;
