import FilmsModel from "../model/films";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

class Server {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(Server.toJSON)
      .then((tasks) => tasks.map(FilmsModel.adaptToClient));
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(Server.toJSON);
  }

  updateFilms(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then(Server.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Server.checkStatus)
      .catch(Server.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}

export default Server;
