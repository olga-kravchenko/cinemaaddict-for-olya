import FilmsModel from "../model/films";
import {isOnline} from "../utils/util";

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.films);
};

const createStoreStructure = (items) => {
  return items.reduce((previousFilms, currentFilms) => {
    return Object.assign({}, previousFilms, {
      [currentFilms.id]: currentFilms,
    });
  }, {});
};

class Provider {
  constructor(server, localStorage) {
    this._server = server;
    this._localStorage = localStorage;
  }

  getFilms() {
    if (isOnline()) {
      return this._server.getFilms()
        .then((films) => {
          const items = films.map(FilmsModel.adaptToServer);
          this._localStorage.setItems(items);
          return films;
        });
    }
    const storedFilms = this._localStorage.getItems();
    const adaptedStoredFilms = storedFilms.map(FilmsModel.adaptToClient);
    return Promise.resolve(adaptedStoredFilms);
  }

  updateFilm(film) {
    if (isOnline()) {
      return this._server.updateFilm(film)
        .then((updatedFilm) => {
          const adaptedUpdatedFilms = FilmsModel.adaptToServer(updatedFilm);
          this._localStorage.setItem(updatedFilm.id, adaptedUpdatedFilms);
          return updatedFilm;
        });
    }
    this._localStorage.setItem(film.id, FilmsModel.adaptToServer(film));
    return Promise.resolve(film);
  }

  getComments(filmId) {
    return isOnline() ? this._server.getComments(filmId) : Promise.reject(new Error(`Can't get comments offline`));
  }

  addComment(filmId, newComment) {
    return isOnline ? this._server.addComment(filmId, newComment) : Promise.reject(new Error(`Can't add comments offline`));
  }

  deleteComments(commentId) {
    return isOnline() ? this._server.deleteComments(commentId) : Promise.reject(new Error(`Can't remove comments offline`));
  }

  sync() {
    if (isOnline()) {
      const storedFilms = Object.values(this._localStorage.getItems());
      return this._server.sync(storedFilms)
        .then((response) => {
          const updatedFilms = getSyncedFilms(response.updated);
          const items = createStoreStructure([...updatedFilms]);
          this._localStorage.setItems(items);
        });
    }
    return Promise.reject(new Error(`Sync data failed`));
  }
}

export default Provider;
