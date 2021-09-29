import Abstract from "./abstract";

const createExtraFilmsContainerTemplate = (title) => `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>
<!--      <div class="films-list__container"></div>-->
    </section>`;

class ExtraFilmsContainer extends Abstract {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createExtraFilmsContainerTemplate(this._title);
  }
}

export default ExtraFilmsContainer;
