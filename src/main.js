import {createUserTemplate} from "./view/user";
import {createMenuTemplate} from "./view/menu";
import {createSortingTemplate} from "./view/sorting";
import {createContentTemplate} from "./view/content";
import {createFilmsContainerTemplate} from "./view/films-container";
import {createExtraFilmsContainerTemplate} from "./view/extra-films-container";
import {createFilmTemplate} from "./view/film";
import {createFilmsQuantityTemplate} from "./view/films-quantity";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {render} from "./utils/render";

const MAX_SHOWN_FILMS_QUANTITY = 5;
const MIN_SHOWN_FILMS_QUANTITY = 2;
const RATED = 0;
const COMMENTED = 1;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const statistics = document.querySelector(`.footer__statistics`);

render(header, createUserTemplate(), `beforeend`);
render(main, createMenuTemplate(), `beforeend`);
render(main, createSortingTemplate(), `beforeend`);
render(main, createContentTemplate(), `beforeend`);

const contentContainer = document.querySelector(`.films`);
render(contentContainer, createFilmsContainerTemplate(), `beforeend`);

const filmsContainer = document.querySelector(`.films-list__container`);
const filmsList = document.querySelector(`.films-list`);
for (let i = 0; i < MAX_SHOWN_FILMS_QUANTITY; i++) {
  render(filmsContainer, createFilmTemplate(), `beforeend`);
}
render(filmsList, createShowMoreButtonTemplate(), `beforeend`);

render(contentContainer, createExtraFilmsContainerTemplate(`rated`), `beforeend`);
render(contentContainer, createExtraFilmsContainerTemplate(`commented`), `beforeend`);
const filmsRatedContainer = document.querySelectorAll(`.films-list--extra`)[RATED].querySelector(`.films-list__container`);
const filmsCommentedContainer = document.querySelectorAll(`.films-list--extra`)[COMMENTED].querySelector(`.films-list__container`);

for (let i = 0; i < MIN_SHOWN_FILMS_QUANTITY; i++) {
  render(filmsRatedContainer, createFilmTemplate(), `beforeend`);
  render(filmsCommentedContainer, createFilmTemplate(), `beforeend`);
}

render(statistics, createFilmsQuantityTemplate(), `beforeend`);
