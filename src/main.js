import {createUserTemplate} from "./view/user";
import {createMenuTemplate} from "./view/menu";
import {createSortingTemplate} from "./view/sorting";
import {createContentTemplate} from "./view/content";
import {createFilmsContainerTemplate} from "./view/films-container";
import {createExtraFilmsContainerTemplate} from "./view/extra-films-container";
import {createFilmTemplate} from "./view/film";
import {createFilmsQuantityTemplate} from "./view/films-quantity";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createPopupTemplate} from "./view/popup";
import {render} from "./utils/render";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter";

const MAX_SHOWN_FILMS_QUANTITY = 5;
const MIN_SHOWN_FILMS_QUANTITY = 2;
const RATED = 0;
const COMMENTED = 1;
const FILMS_QUANTITY = 20;

const films = new Array(FILMS_QUANTITY).fill().map(generateFilm);
const filters = generateFilter(films);
console.log(filters)

const body = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const statistics = document.querySelector(`.footer__statistics`);

render(header, createUserTemplate(), `beforeend`);
render(main, createMenuTemplate(filters), `beforeend`);
render(main, createSortingTemplate(), `beforeend`);
render(main, createContentTemplate(), `beforeend`);
// render(body, createPopupTemplate(films[0]), `beforeend`);

const contentContainer = document.querySelector(`.films`);
render(contentContainer, createFilmsContainerTemplate(), `beforeend`);

const filmsContainer = document.querySelector(`.films-list__container`);
const filmsList = document.querySelector(`.films-list`);
for (let i = 0; i < MAX_SHOWN_FILMS_QUANTITY; i++) {
  render(filmsContainer, createFilmTemplate(films[i]), `beforeend`);
}
render(filmsList, createShowMoreButtonTemplate(), `beforeend`);

render(contentContainer, createExtraFilmsContainerTemplate(`rated`), `beforeend`);
render(contentContainer, createExtraFilmsContainerTemplate(`commented`), `beforeend`);
const filmsRatedContainer = document.querySelectorAll(`.films-list--extra`)[RATED].querySelector(`.films-list__container`);
const filmsCommentedContainer = document.querySelectorAll(`.films-list--extra`)[COMMENTED].querySelector(`.films-list__container`);

for (let i = 0; i < MIN_SHOWN_FILMS_QUANTITY; i++) {
  render(filmsRatedContainer, createFilmTemplate(films[i]), `beforeend`);
  render(filmsCommentedContainer, createFilmTemplate(films[i]), `beforeend`);
}

render(statistics, createFilmsQuantityTemplate(), `beforeend`);
