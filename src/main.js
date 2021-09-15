import {createUserTemplate} from "./view/user";
import {createMenuTemplate} from "./view/menu";
import {createSortingTemplate} from "./view/sorting";
import {createContentTemplate} from "./view/content";
import {createFilmsContainerTemplate} from "./view/films-container";
import {createFilmsRatedContainerTemplate} from "./view/films-roted-container";
import {createFilmsCommentedContainerTemplate} from "./view/films-commented-container";
import {createFilmTemplate} from "./view/film";
import {createFilmExtraTemplate} from "./view/film-extra";
import {createNumerOfFilmsTemplate} from "./view/number-of-films";
import {createLoadMoreButtonTemplate} from "./view/load-more-button";
import {render} from "./utils/films";

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
for (let i = 0; i < 5; i++) {
  render(filmsContainer, createFilmTemplate(), `beforeend`);
}
render(filmsList, createLoadMoreButtonTemplate(), `beforeend`);

render(contentContainer, createFilmsRatedContainerTemplate(), `beforeend`);
const filmsRatedContainer = document.querySelector(`.films-list--extra-rate .films-list__container`);
for (let i = 0; i < 2; i++) {
  render(filmsRatedContainer, createFilmExtraTemplate(), `beforeend`);
}

render(contentContainer, createFilmsCommentedContainerTemplate(), `beforeend`);
const filmsCommentedContainer = document.querySelector(`.films-list--extra-commented .films-list__container`);
for (let i = 0; i < 2; i++) {
  render(filmsCommentedContainer, createFilmExtraTemplate(), `beforeend`);
}

render(statistics, createNumerOfFilmsTemplate(), `beforeend`);
