import Observer from "../utils/observer.js";

class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set films(films) {
    this._films = [...films];
  }

  get films() {
    return this._films;
  }

  updateFilm(updatedType, film) {
    const index = this._films.findIndex((f) => f.id === film.id);
    if (index === -1) {
      throw new Error(`Can't update non-existing film`);
    }
    this._films[index] = film;
    this._notify(updatedType, film);
  }
}

export default Films;
