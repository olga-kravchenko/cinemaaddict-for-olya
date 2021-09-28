import Abstract from "./abstract";
import {SortType} from "../constants";

const createSortingItemsTemplate = (activeItem) => {
  const SORTING_NAMES = Object.values(SortType);
  const items = SORTING_NAMES.map((item) => `<li><a href="#" class="sort__button ${item === activeItem ? `sort__button--active` : ``}" datatype="${item}">Sort by ${item}</a></li>`);
  return items.join(``);
};

const createSortingTemplate = () => {
  const activeItem = SortType.DEFAULT;
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
