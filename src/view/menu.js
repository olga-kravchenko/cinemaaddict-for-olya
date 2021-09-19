import {getRandomNumber} from "../utils/render";

const MAX_FILMS_QUANTITY = 100;

const createFiltersTemplate = () => {
  const filterNames = [`Watchlist`, `History`, `Favorites`];
  const filters = [];
  filterNames.forEach((item) => {
    filters.push(`
      <a href="#${item.toLowerCase()}" class="main-navigation__item">
        ${item}
        <span class="main-navigation__item-count">${getRandomNumber(1, MAX_FILMS_QUANTITY)}</span>
      </a>`);
  });
  return filters.join(``);
};

const createMenuTemplate = () => {
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${createFiltersTemplate()}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export {createMenuTemplate};
