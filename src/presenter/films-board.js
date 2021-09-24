import ContentView from "../view/content";
import FilmsView from "../view/films";
import FilmsContainerView from "../view/films-container";
import ShowMoreButtonView from "../view/show-more-button";
import ExtraFilmsContainerView from "../view/extra-films-container";

class FilmsBoard {
  constructor(container) {
    this._container = container;

    const contentContainerComponent = new ContentView();
    const filmsComponent = new FilmsView();
    const filmContainerComponent = new FilmsContainerView();
    const showMoreButtonComponent = new ShowMoreButtonView();
    const ratedContainerComponent = new ExtraFilmsContainerView(`Top rated`);
    const commentedContainerComponent = new ExtraFilmsContainerView(`Top commented`);
  }

  init(films) {
    this._films = films;
  }

  _renderUser() {

  }

  _renderMenu() {

  }

  _renderSorting() {

  }

  _renderContent() {

  }

  _renderNoFilms() {

  }

  _renderFilmsList() {

  }

  _renderFilmContainer() {

  }

  _renderExtraContainers() {

  }

  _renderFilm() {

  }

  _renderShowMoreButton() {

  }

  _renderFilmQuantity() {

  }
}

export default FilmsBoard;
