const createFiltersTemplate = (filters) => {
  const filtersTemplate = [];
  filters.forEach((filter) => {
    filtersTemplate.push(`
      <a href="#${filter.name.toLowerCase()}" class="main-navigation__item">
        ${filter.name}
        <span class="main-navigation__item-count">${filter.quantity}</span>
      </a>`);
  });
  return filtersTemplate.join(``);
};

const createMenuTemplate = (filters) => {
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${createFiltersTemplate(filters)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export {createMenuTemplate};
