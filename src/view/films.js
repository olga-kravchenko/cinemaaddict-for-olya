import {createElement} from "../utils/render";

const createFilmsTemplate = () => {
  return `
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`;
};


class FilmsView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsTemplate();
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

export default FilmsView;


