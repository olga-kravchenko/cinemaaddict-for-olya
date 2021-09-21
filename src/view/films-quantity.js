import {createElement} from "../utils/render";

const createFilmsQuantityTemplate = (films) => `<p>${films.length} movies inside</p>`;


class FilmsQuantityView {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmsQuantityTemplate(this._film);
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

export default FilmsQuantityView;

