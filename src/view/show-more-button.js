import AbstractView from "./abstract";

const createShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

class ShowMoreButtonView extends AbstractView {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}

export default ShowMoreButtonView;


