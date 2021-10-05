import UserView from "./view/user";
import FilmsQuantityView from "./view/films-quantity";
import {RenderPosition, render} from "./utils/render";
import {generateFilm} from "./mock/film";
import FilmsBoardPresenter from "./presenter/films-board";
import FilmsModel from "./model/film";
import FilterModel from "./model/filter";
import FilterPresenter from "./presenter/filter";

const FILMS_QUANTITY = 22;

const films = new Array(FILMS_QUANTITY).fill().map(generateFilm);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const statistics = document.querySelector(`.footer__statistics`);

render(header, new UserView(films), RenderPosition.BEFORE_END);

const filmBoardPresenter = new FilmsBoardPresenter(main, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(main, filterModel, filmsModel, filmBoardPresenter);

filterPresenter.init();
filmBoardPresenter.init();

render(statistics, new FilmsQuantityView(films.length), RenderPosition.BEFORE_END);
