import {RenderPosition, render} from "./utils/render";
import FilmsBoardPresenter from "./presenter/films-board";
import FilmsModel from "./model/films";
import FilterModel from "./model/filters";
import MenuPresenter from "./presenter/menu";
import StatsView from "./view/stats";
import Server from "./api/server";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic hiya87868v96vkjkjiyls2j`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;
const STORE_PREFIX = `cinema-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const main = document.querySelector(`.main`);

const server = new Server(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const provider = new Provider(server, store);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const statsComponent = new StatsView(filmsModel.films);
const filmBoardPresenter = new FilmsBoardPresenter(main, filmsModel, filterModel, statsComponent, provider);
const menuPresenter = new MenuPresenter(main, filterModel, filmsModel, filmBoardPresenter, statsComponent);

statsComponent.hide();
filmBoardPresenter.init();

provider.getFilms()
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

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  provider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
