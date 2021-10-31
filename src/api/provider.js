import FilmsModel from "../model/films";
import {isOnline} from "../utils/util";

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.films);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);
          return films;
        });
    }
    const storeTasks = Object.values(this._store.getItems());
    return Promise.resolve(storeTasks.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    if (isOnline()) {
      return this._api.updateFilm(film)
        .then((updateFilm) => {
          this._store.setItem(updateFilm.id, FilmsModel.adaptToServer(updateFilm));
          return updateFilm;
        });
    }

    this._store.setItem(film.id, FilmsModel.adaptToServer(Object.assign({}, film)));
    return Promise.resolve(film);
  }

  getComments(filmId) {
    return isOnline() ? this._api.getComments(filmId) : Promise.reject(new Error(`Can't get comments offline`));
  }

  addComment(filmId, newComment) {
    return isOnline ? this._api.addComment(filmId, newComment) : Promise.reject(new Error(`Can't add comments offline`));
  }

  deleteComments(commentId) {
    return isOnline() ? this._api.deleteComments(commentId) : Promise.reject(new Error(`Can't remove comments offline`));
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const updatedFilms = getSyncedFilms(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...updatedFilms]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}

export default Provider;
