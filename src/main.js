import UserView from "./view/user";
import FilmQuantityView from "./view/film-quantity";
import {RenderPosition, render} from "./utils/render";
import FilmsBoardPresenter from "./presenter/films-board";
import FilmsModel from "./model/films";
import FilterModel from "./model/filters";
import MenuPresenter from "./presenter/menu";
import StatsView from "./view/stats";
import Server from "./api/server";

const AUTHORIZATION = `Basic hiya87868vcs98v9696vinyls2j`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;

const server = new Server(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const filterModel = new FilterModel();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const statistics = document.querySelector(`.footer__statistics`);

const statsComponent = new StatsView(filmsModel.films);
const userComponent = new UserView(filmsModel.films);

render(header, userComponent, RenderPosition.BEFORE_END);
statsComponent.hide();

const filmBoardPresenter = new FilmsBoardPresenter(main, filmsModel, filterModel, statsComponent, userComponent, server);
const menuPresenter = new MenuPresenter(main, filterModel, filmsModel, filmBoardPresenter, statsComponent);

menuPresenter.init();
render(main, statsComponent, RenderPosition.BEFORE_END);
filmBoardPresenter.init();

render(statistics, new FilmQuantityView(filmsModel.films.length), RenderPosition.BEFORE_END);

server.getFilms()
  .then((films) => {
    filmsModel.films = films;
  })
  .catch(() => {
    filmsModel.films = [];
  });
