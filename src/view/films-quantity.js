import AbstractView from "./abstract";

const createFilmsQuantityTemplate = (films) => `<p>${films.length} movies inside</p>`;


class FilmsQuantityView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmsQuantityTemplate(this._film);
  }
}

export default FilmsQuantityView;

