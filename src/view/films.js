import AbstractView from "./abstract";

const createFilmsTemplate = () => {
  return `
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`;
};

class FilmsView extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }
}

export default FilmsView;


