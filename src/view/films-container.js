import {createElement} from "../utils/render";

const createFilmsContainerTemplate = () => `<div class="films-list__container"></div>`;

class FilmsContainerView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainerTemplate();
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

export default FilmsContainerView;

