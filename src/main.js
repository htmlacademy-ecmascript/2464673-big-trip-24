import { render, RenderPosition } from './render.js';
import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model.js/points-model.js';
import OffersModel from './model.js/offers-model.js';
import DestinationsModel from './model.js/destinations-model.js';


const infoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-body');
const siteHeaderElement = siteMainElement.querySelector('.trip-controls__filters');
const siteSortElement = siteMainElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const boardPresenter = new MainPresenter({boardContainer: siteSortElement, pointsModel, offersModel, destinationsModel});


render(new InfoView(), infoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteHeaderElement);

boardPresenter.init();

