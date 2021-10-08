import Observer from "../utils/observer.js";

class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = [...films];
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, film) {
    const index = this._films.findIndex((f) => f.id === f.id);
    if (index === -1) {
      throw new Error(`Can't update non-existing film`);
    }
    this._films[index] = film;
    this._notify(updateType, film);
  }
}

export default Films;
