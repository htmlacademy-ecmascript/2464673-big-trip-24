// import { render } from './framework/render.js';
// import { generateFilter } from './mocks/filter.js';
// import FilterView from './view/filter-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render, RenderPosition } from './framework/render';

const infoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-body');
const siteHeaderElement = siteMainElement.querySelector('.trip-controls__filters');
const siteSortElement = siteMainElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FiltersModel();

const mainPresenter = new MainPresenter({
  boardContainer: siteSortElement,
  headerContainer: infoElement,
  filterModel: filterModel,
  pointsModel: pointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel,
  onNewPointDestroy: handleNewPointFormClose,//раздизейбливает кнопку нев ивент
});

const newPointButtonComponent = new NewPointButtonView({
  onButtonClick: handleNewPointButtonClick
});

function handleNewPointButtonClick() {
  mainPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

render(newPointButtonComponent, infoElement, RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filterModel: filterModel,
  pointsModel: pointsModel
});

filterPresenter.init();
mainPresenter.init();

