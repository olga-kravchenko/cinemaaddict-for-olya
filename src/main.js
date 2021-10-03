import UserView from "./view/user";
import MenuView from "./view/menu";
import FilmsQuantityView from "./view/films-quantity";
import {RenderPosition, render} from "./utils/render";
import {generateFilm} from "./mock/film";
import {generateFilters} from "./mock/filter";
import FilmsBoardPresenter from "./presenter/films-board";
import FilmsModel from "./model/film";

const FILMS_QUANTITY = 22;

const films = new Array(FILMS_QUANTITY).fill().map(generateFilm);
const filters = generateFilters(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const statistics = document.querySelector(`.footer__statistics`);

const filmBoardPresenter = new FilmsBoardPresenter(main, filmsModel);
render(header, new UserView(films), RenderPosition.BEFORE_END);
render(main, new MenuView(filters), RenderPosition.BEFORE_END);
render(statistics, new FilmsQuantityView(films.length), RenderPosition.BEFORE_END);

filmBoardPresenter.init();
