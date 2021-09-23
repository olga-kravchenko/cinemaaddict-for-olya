import AbstractView from "./abstract";
import {EMPTY_STRING} from "../constants";

const createSortingItemsTemplate = (activeItem) => {
  const sortingNames = [`default`, `date`, `rating`];
  const items = [];
  sortingNames.forEach((item) => {
    items.push(`<li><a href="#" class="sort__button ${item === activeItem ? `sort__button--active` : EMPTY_STRING}">Sort by ${item}</a></li>`);
  });
  return items.join(``);
};

const createSortingTemplate = () => {
  const activeItem = `default`;
  return `
    <ul class="sort">
      ${createSortingItemsTemplate(activeItem)}
    </ul>`;
};

class SortingView extends AbstractView {
  getTemplate() {
    return createSortingTemplate();
  }
}

export default SortingView;
