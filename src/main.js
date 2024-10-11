// import { render } from './framework/render.js';
// import { generateFilter } from './mocks/filter.js';
// import FilterView from './view/filter-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model.js/points-model.js';
import OffersModel from './model.js/offers-model.js';
import DestinationsModel from './model.js/destinations-model.js';
import FiltersModel from './model.js/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

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
  filterModel,
  pointsModel,
  offersModel,
  destinationsModel
});
// const filters = generateFilter(pointsModel.points);


const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filterModel: filterModel,
  pointsModel: pointsModel
});

// render(new FilterView({filters}), siteHeaderElement);

filterPresenter.init();
mainPresenter.init();

