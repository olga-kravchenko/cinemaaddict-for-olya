import Observer from "../utils/observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films .slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, updatedElement) {
    const index = this._films.findIndex((film) => film.id === updatedElement.id);
    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }
    this._films[index] = updatedElement;
    this._notify(updateType, updatedElement);
  }
}
