import Abstract from "./abstract";

const createSortingItemsTemplate = (activeItem) => {
  const SORTING_NAMES = [`default`, `date`, `rating`];
  const items = SORTING_NAMES.map((item) => `<li><a href="#" class="sort__button ${item === activeItem ? `sort__button--active` : ``}">Sort by ${item}</a></li>`);
  return items.join(``);
};

const createSortingTemplate = () => {
  const activeItem = `default`;
  return `
    <ul class="sort">
      ${createSortingItemsTemplate(activeItem)}
    </ul>`;
};

class Sorting extends Abstract {
  getTemplate() {
    return createSortingTemplate();
  }
}

export default Sorting;
