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
import {RenderPosition} from "./constants";

const MIN_SHOWN_FILMS_QUANTITY = 2;
const RATED = 0;
const COMMENTED = 1;
const FILMS_QUANTITY = 20;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILMS_QUANTITY).fill().map(generateFilm);
const filters = generateFilter(films);

const body = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const statistics = document.querySelector(`.footer__statistics`);

render(header, createUserTemplate(films), RenderPosition.BEFOREEND);
render(main, createMenuTemplate(filters), RenderPosition.BEFOREEND);
render(main, createSortingTemplate(), RenderPosition.BEFOREEND);
render(main, createContentTemplate(), RenderPosition.BEFOREEND);
// render(body, createPopupTemplate(films[0]), RenderPosition.BEFOREEND);

const contentContainer = document.querySelector(`.films`);
render(contentContainer, createFilmsContainerTemplate(), RenderPosition.BEFOREEND);

const filmsContainer = document.querySelector(`.films-list__container`);
const filmsList = document.querySelector(`.films-list`);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsContainer, createFilmTemplate(films[i]), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedTaskCount = FILM_COUNT_PER_STEP;
  render(filmsList, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);

  const showMoreButton = filmsList.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(renderedTaskCount, renderedTaskCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsContainer, createFilmTemplate(film), RenderPosition.BEFOREEND));

    renderedTaskCount += FILM_COUNT_PER_STEP;

    if (renderedTaskCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

render(contentContainer, createExtraFilmsContainerTemplate(`Top rated`), RenderPosition.BEFOREEND);
render(contentContainer, createExtraFilmsContainerTemplate(`Top commented`), RenderPosition.BEFOREEND);
const filmsRatedContainer = document.querySelectorAll(`.films-list--extra`)[RATED].querySelector(`.films-list__container`);
const filmsCommentedContainer = document.querySelectorAll(`.films-list--extra`)[COMMENTED].querySelector(`.films-list__container`);

for (let i = 0; i < MIN_SHOWN_FILMS_QUANTITY; i++) {
  render(filmsRatedContainer, createFilmTemplate(films[i]), RenderPosition.BEFOREEND);
  render(filmsCommentedContainer, createFilmTemplate(films[i]), RenderPosition.BEFOREEND);
}

render(statistics, createFilmsQuantityTemplate(films), RenderPosition.BEFOREEND);
