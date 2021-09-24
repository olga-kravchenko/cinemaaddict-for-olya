import UserView from "./view/user";
import MenuView from "./view/menu";
import SortingView from "./view/sorting";
import ContentView from "./view/content";
import FilmsView from "./view/films";
import FilmsContainerView from "./view/films-container";
import ExtraFilmsContainerView from "./view/extra-films-container";
import FilmView from "./view/film";
import FilmsQuantityView from "./view/films-quantity";
import ShowMoreButtonView from "./view/show-more-button";
import PopupView from "./view/popup";
import NoFilmsView from "./view/no-films";
import {RenderPosition, render, remove} from "./utils/render";
import {generateFilm} from "./mock/film";
import {generateFilters} from "./mock/filter";

let MIN_SHOWN_FILMS_QUANTITY = 2;
const FILMS_QUANTITY = 22;
const FILM_QUANTITY_PER_STEP = 5;

const films = new Array(FILMS_QUANTITY).fill().map(generateFilm);
const filters = generateFilters(films);

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const main = body.querySelector(`.main`);
const statistics = body.querySelector(`.footer__statistics`);

const contentContainerComponent = new ContentView();
const filmsComponent = new FilmsView();
const filmContainerComponent = new FilmsContainerView();
const showMoreButtonComponent = new ShowMoreButtonView();
const ratedContainerComponent = new ExtraFilmsContainerView(`Top rated`);
const commentedContainerComponent = new ExtraFilmsContainerView(`Top commented`);

const renderFilm = (filmsContainer, film) => {
  const filmComponent = new FilmView(film);
  const filmPopupComponent = new PopupView(film);
  render(filmsContainer, filmComponent, RenderPosition.BEFORE_END);

  const showPopup = () => {
    if (!document.querySelector(`.film-details`)) {
      body.classList.add(`hide-overflow`);
      body.appendChild(filmPopupComponent.getElement());
    }
  };

  const closePopup = () => {
    body.classList.remove(`hide-overflow`);
    body.removeChild(filmPopupComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onPopupClick = () => {
    showPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onCloseButtonClick = () => {
    closePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  filmComponent.setCardClickHandler(onPopupClick);
  filmPopupComponent.setPopupCloseHandler(onCloseButtonClick);
};

render(header, new UserView(films), RenderPosition.BEFORE_END);
render(main, new MenuView(filters), RenderPosition.BEFORE_END);
render(main, new SortingView(), RenderPosition.BEFORE_END);
render(main, contentContainerComponent, RenderPosition.BEFORE_END);

if (!films.length) {
  render(contentContainerComponent, new NoFilmsView(), RenderPosition.AFTER_BEGIN);
} else {
  render(contentContainerComponent, filmsComponent, RenderPosition.BEFORE_END);
  render(filmsComponent, filmContainerComponent, RenderPosition.BEFORE_END);

  for (let i = 0; i < Math.min(films.length, FILM_QUANTITY_PER_STEP); i++) {
    renderFilm(filmContainerComponent.getElement(), films[i]);
  }

  render(contentContainerComponent, ratedContainerComponent, RenderPosition.BEFORE_END);
  render(contentContainerComponent, commentedContainerComponent, RenderPosition.BEFORE_END);

  const ratedContainer = ratedContainerComponent.getElement().querySelector(`.films-list--extra .films-list__container`);
  const commentedContainer = commentedContainerComponent.getElement().querySelector(`.films-list--extra .films-list__container`);

  MIN_SHOWN_FILMS_QUANTITY = films.length < MIN_SHOWN_FILMS_QUANTITY ? films.length : MIN_SHOWN_FILMS_QUANTITY;
  for (let i = 0; i < MIN_SHOWN_FILMS_QUANTITY; i++) {
    renderFilm(ratedContainer, films[i]);
    renderFilm(commentedContainer, films[i]);
  }
}

if (films.length > FILM_QUANTITY_PER_STEP) {
  let renderedTaskCount = FILM_QUANTITY_PER_STEP;
  render(filmsComponent, showMoreButtonComponent, RenderPosition.BEFORE_END);

  showMoreButtonComponent.setClickHandler(() => {
    films.slice(renderedTaskCount, renderedTaskCount + FILM_QUANTITY_PER_STEP)
      .forEach((film) => render(filmContainerComponent.getElement(), new FilmView(film).getElement(), RenderPosition.BEFORE_END));
    renderedTaskCount += FILM_QUANTITY_PER_STEP;
    if (renderedTaskCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });
}

render(statistics, new FilmsQuantityView(films.length), RenderPosition.BEFORE_END);
