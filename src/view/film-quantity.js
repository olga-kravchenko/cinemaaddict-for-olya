import Abstract from "./abstract";

const createFilmQuantityTemplate = (filmQuantity) => `<p>${filmQuantity} movies inside</p>`;

class FilmQuantity extends Abstract {
  constructor(filmQuantity) {
    super();
    this._filmQuantity = filmQuantity;
  }

  getTemplate() {
    return createFilmQuantityTemplate(this._filmQuantity);
  }
}

export default FilmQuantity;
