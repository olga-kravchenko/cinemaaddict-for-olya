import UserView from "./view/user";
import FilmQuantityView from "./view/film-quantity";
import {RenderPosition, render} from "./utils/render";
import {generateFilm} from "./mock/film";
import FilmsBoardPresenter from "./presenter/films-board";
import FilmsModel from "./model/films";
import FilterModel from "./model/filters";
import MenuPresenter from "./presenter/menu";
import StatsView from "./view/stats";

const FILM_QUANTITY = 22;

const films = new Array(FILM_QUANTITY).fill().map(generateFilm);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const statistics = document.querySelector(`.footer__statistics`);

const statsComponent = new StatsView(filmsModel.getFilms());
const userComponent = new UserView(filmsModel.getFilms());

render(header, userComponent, RenderPosition.BEFORE_END);
statsComponent.hide();

const filmBoardPresenter = new FilmsBoardPresenter(main, filmsModel, filterModel, statsComponent, userComponent);
const menuPresenter = new MenuPresenter(main, filterModel, filmsModel, filmBoardPresenter, statsComponent);

menuPresenter.init();
render(main, statsComponent, RenderPosition.BEFORE_END);
filmBoardPresenter.init();

render(statistics, new FilmQuantityView(films.length), RenderPosition.BEFORE_END);
