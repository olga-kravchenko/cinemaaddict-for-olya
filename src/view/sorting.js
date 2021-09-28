import Abstract from "./abstract";
import {SortType} from "../constants";

// const createSortingItemsTemplate = (activeItem) => {
//   const SORTING_NAMES = Object.values(SortType);
//   const items = SORTING_NAMES.map((item) => `<li><a href="#" class="sort__button ${item === activeItem ? `sort__button--active` : ``}" datatype="${item}">Sort by ${item}</a></li>`);
//   return items.join(``);
// };

const createSortingTemplate = () => {
  return `
    <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by ${SortType.DEFAULT}</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by ${SortType.DATE}</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by ${SortType.RATING}</a></li>
    </ul>`;
};

class Sorting extends Abstract {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate();
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    document.querySelectorAll(`.sort__button--active`).forEach((e) => e.classList.remove(`sort__button--active`));
    evt.target.classList.add(`sort__button--active`);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

export default Sorting;
