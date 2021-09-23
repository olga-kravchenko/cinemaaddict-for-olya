import AbstractView from "./abstract";

const createFilmsContainerTemplate = () => `<div class="films-list__container"></div>`;

class FilmsContainerView extends AbstractView {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}

export default FilmsContainerView;

