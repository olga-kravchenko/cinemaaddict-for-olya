import AbstractView from "./abstract";

const createContentTemplate = () => `<section class="films"></section>`;

class ContentView extends AbstractView {
  getTemplate() {
    return createContentTemplate();
  }
}

export default ContentView;

