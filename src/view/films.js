import Abstract from "./abstract";

const createFilmsTemplate = () => `
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`;

class Films extends Abstract {
  getTemplate() {
    return createFilmsTemplate();
  }
}

export default Films;
