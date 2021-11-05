import Abstract from "./abstract";

const createLoadingFilmsTemplate = () => `
 <section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`;

class Loading extends Abstract {
  getTemplate() {
    return createLoadingFilmsTemplate();
  }
}

export default Loading;
