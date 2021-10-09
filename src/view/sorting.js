import Abstract from "./abstract";
import {SortType} from "../constants";

const createSortingTemplate = (currentSortType) => {
  return `
    <ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? `sort__button--active` : ``}" data-sort-type="${SortType.DEFAULT}">Sort by ${SortType.DEFAULT}</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.DATE ? `sort__button--active` : ``}" data-sort-type="${SortType.DATE}">Sort by ${SortType.DATE}</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.RATING ? `sort__button--active` : ``}" data-sort-type="${SortType.RATING}">Sort by ${SortType.RATING}</a></li>
    </ul>`;
};

class Sorting extends Abstract {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    this.getElement().querySelectorAll(`.sort__button--active`).forEach((e) => e.classList.remove(`sort__button--active`));
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

export default Sorting;
