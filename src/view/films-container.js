import Abstract from "./abstract";

const createFilmsContainerTemplate = () => `<div class="films-list__container"></div>`;

class FilmsContainer extends Abstract {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}

export default FilmsContainer;
