import Abstract from "./abstract";

const createContentTemplate = () => `<section class="films"></section>`;

class Content extends Abstract {
  getTemplate() {
    return createContentTemplate();
  }
}

export default Content;
