import {RenderPosition, render} from "./utils/render";
import FilmsBoardPresenter from "./presenter/films-board";
import FilmsModel from "./model/films";
import FilterModel from "./model/filters";
import MenuPresenter from "./presenter/menu";
import StatsView from "./view/stats";
import Server from "./api/server";

const AUTHORIZATION = `Basic hiya87868v96vkjkjinyls2j`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;
const main = document.querySelector(`.main`);

const server = new Server(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const statsComponent = new StatsView(filmsModel.films);
const filmBoardPresenter = new FilmsBoardPresenter(main, filmsModel, filterModel, statsComponent, server);
const menuPresenter = new MenuPresenter(main, filterModel, filmsModel, filmBoardPresenter, statsComponent);

statsComponent.hide();
filmBoardPresenter.init();

server.getFilms()
  .then((films) => {
    filmsModel.films = films;
  })
  .catch(() => {
    filmsModel.films = [];
  })
  .finally(() => {
    menuPresenter.init();
    render(main, statsComponent, RenderPosition.BEFORE_END);
  });
