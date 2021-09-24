import Abstract from "./abstract";

const createNoFilmsTemplate = () => `<h2 class="films-list__title">There are no movies in our database</h2>`;

class NoFilms extends Abstract {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}

export default NoFilms;
