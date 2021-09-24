import Abstract from "./abstract";

const createFilmsQuantityTemplate = (filmQuantity) => `<p>${filmQuantity} movies inside</p>`;

class FilmsQuantity extends Abstract {
  constructor(filmQuantity) {
    super();
    this._filmQuantity = filmQuantity;
  }

  getTemplate() {
    return createFilmsQuantityTemplate(this._filmQuantity);
  }
}

export default FilmsQuantity;
