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
import {RenderPosition, render} from "./utils/render";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter";

const MIN_SHOWN_FILMS_QUANTITY = 2;
const FILMS_QUANTITY = 20;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILMS_QUANTITY).fill().map(generateFilm);
const filters = generateFilter(films);

const body = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const statistics = document.querySelector(`.footer__statistics`);

const contentContainerComponent = new ContentView();
const filmsComponent = new FilmsView();
const filmContainerComponent = new FilmsContainerView();
const ratedContainerComponent = new ExtraFilmsContainerView(`Top rated`);
const commentedContainerComponent = new ExtraFilmsContainerView(`Top commented`);

const renderFilm = (filmsContainer, film) => {
  const filmComponent = new FilmView(film);
  const filmPopupComponent = new PopupView(film);
  render(filmsContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);

  const replaceCardToPopup = () => {
    if (!document.querySelector(`.film-details`)) {
      body.classList.add(`hide-overflow`);
      body.appendChild(filmPopupComponent.getElement());
    }
  };

  const replacePopupToCard = () => {
    body.classList.remove(`hide-overflow`);
    body.removeChild(filmPopupComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replacePopupToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onPopupClick = () => {
    replaceCardToPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onCloseButtonClick = () => {
    replacePopupToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onPopupClick);
  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onPopupClick);
  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onPopupClick);
  filmPopupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseButtonClick);
};

render(header, new UserView(films).getElement(), RenderPosition.BEFOREEND);
render(main, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(main, new SortingView().getElement(), RenderPosition.BEFOREEND);
render(main, contentContainerComponent.getElement(), RenderPosition.BEFOREEND);

if (!films.length) {
  render(contentContainerComponent.getElement(), new NoFilmsView().getElement(), RenderPosition.AFTERBEGIN);
} else {
  render(contentContainerComponent.getElement(), filmsComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmsComponent.getElement(), filmContainerComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmContainerComponent.getElement(), films[i]);
  }

  render(contentContainerComponent.getElement(), ratedContainerComponent.getElement(), RenderPosition.BEFOREEND);
  render(contentContainerComponent.getElement(), commentedContainerComponent.getElement(), RenderPosition.BEFOREEND);

  const ratedContainer = ratedContainerComponent.getElement().querySelector(`.films-list--extra .films-list__container`);
  const commentedContainer = commentedContainerComponent.getElement().querySelector(`.films-list--extra .films-list__container`);

  for (let i = 0; i < MIN_SHOWN_FILMS_QUANTITY; i++) {
    renderFilm(ratedContainer, films[i]);
    renderFilm(commentedContainer, films[i]);
  }
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedTaskCount = FILM_COUNT_PER_STEP;
  render(filmsComponent.getElement(), new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = filmsComponent.getElement().querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(renderedTaskCount, renderedTaskCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmContainerComponent.getElement(), new FilmView(film).getElement(), RenderPosition.BEFOREEND));

    renderedTaskCount += FILM_COUNT_PER_STEP;

    if (renderedTaskCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

render(statistics, new FilmsQuantityView(films).getElement(), RenderPosition.BEFOREEND);
