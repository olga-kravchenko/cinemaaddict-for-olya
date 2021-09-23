import AbstractView from "./abstract";

const createExtraFilmsContainerTemplate = (title) => {
  return `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`;
};

class ExtraFilmsContainerView extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createExtraFilmsContainerTemplate(this._title);
  }
}

export default ExtraFilmsContainerView;
