import AbstractView from "./abstract";

const createNoFilmsTemplate = () => `<h2 class="films-list__title">There are no movies in our database</h2>`;

class NoFilmsView extends AbstractView {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}

export default NoFilmsView;

