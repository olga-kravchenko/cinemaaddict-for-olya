import {createElement} from "../utils/render";

const createShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

class ShowMoreButtonView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default ShowMoreButtonView;


