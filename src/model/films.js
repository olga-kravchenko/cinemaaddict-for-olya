import Observer from "../utils/observer.js";
import {UpdateType} from "../constants";

class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set films(films) {
    this._films = [...films];

    this._notify(UpdateType.INIT);
  }

  get films() {
    return this._films;
  }

  updateFilm(updatedType, film, comments) {
    const index = this._films.findIndex((f) => f.id === film.id);
    if (index === -1) {
      throw new Error(`Can't update non-existing film`);
    }
    this._films[index] = film;
    this._notify(updatedType, film, comments);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign({}, film);
    adaptedFilm.filmInfo = film.film_info;
    adaptedFilm.userDetails = film.user_details;

    adaptedFilm.userDetails.alreadyWatched = film.user_details.already_watched;
    adaptedFilm.userDetails.watchingDate = film.user_details.watching_date !== null ?
      new Date(film.user_details.watching_date) :
      film.user_details.watching_date;

    adaptedFilm.filmInfo.originalTitle = film.film_info.alternative_title;
    adaptedFilm.filmInfo.rating = film.film_info.total_rating;
    adaptedFilm.filmInfo.ageRating = film.film_info.age_rating;
    adaptedFilm.filmInfo.duration = film.film_info.runtime;
    adaptedFilm.filmInfo.screenwriters = film.film_info.writers;
    adaptedFilm.filmInfo.genres = film.film_info.genre;
    adaptedFilm.filmInfo.release.country = film.film_info.release.release_country;

    adaptedFilm.filmInfo.release.date = new Date(film.film_info.release.date);

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;

    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.total_rating;
    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.filmInfo.runtime;
    delete adaptedFilm.filmInfo.writers;
    delete adaptedFilm.filmInfo.genre;
    delete adaptedFilm.filmInfo.release.release_country;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign({}, film);
    adaptedFilm[`film_info`] = film.filmInfo;
    adaptedFilm[`user_details`] = film.userDetails;

    adaptedFilm[`user_details`][`already_watched`] = film.userDetails.alreadyWatched;
    adaptedFilm[`user_details`][`watching_date`] = film.userDetails.watchingDate !== null ?
      (film.userDetails.watchingDate).toISOString() :
      null;

    adaptedFilm[`film_info`][`alternative_title`] = film.filmInfo.originalTitle;
    adaptedFilm[`film_info`][`total_rating`] = film.filmInfo.rating;
    adaptedFilm[`film_info`][`age_rating`] = film.filmInfo.ageRating;
    adaptedFilm[`film_info`][`runtime`] = film.filmInfo.duration;
    adaptedFilm[`film_info`][`writers`] = film.filmInfo.screenwriters;
    adaptedFilm[`film_info`][`genre`] = film.filmInfo.genres;
    adaptedFilm[`film_info`].release[`release_country`] = film.filmInfo.release.country;
    adaptedFilm[`film_info`].release.date = film.filmInfo.release.date.toISOString();

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    delete adaptedFilm[`film_info`].originalTitle;
    delete adaptedFilm[`film_info`].rating;
    delete adaptedFilm[`film_info`].ageRating;
    delete adaptedFilm[`film_info`].duration;
    delete adaptedFilm[`film_info`].screenwriters;
    delete adaptedFilm[`film_info`].genres;
    delete adaptedFilm[`film_info`].release.country;

    return adaptedFilm;
  }
}

export default Films;
