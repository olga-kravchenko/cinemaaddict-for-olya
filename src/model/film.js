import Observer from "../utils/observer.js";

class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, updatedFilm) {
    const index = this._films.findIndex((film) => film.id === updatedFilm.id);
    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }
    this._films[index] = updatedFilm;
    this._notify(updateType, updatedFilm);
  }
}

export default Films;
