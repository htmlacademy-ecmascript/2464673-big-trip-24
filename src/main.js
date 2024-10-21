import MainPresenter from './presenter/main-presenter';
import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FiltersModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewPointButtonView from './view/create-point-button-view';
import PointApiService from './service/point-api-service';
import HeaderPresenter from './presenter/header-presenter';
import { render, RenderPosition } from './framework/render';
import { END_POINT, AUTHORIZATION } from './const';

const infoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-body');
const siteHeaderElement = siteMainElement.querySelector('.trip-controls__filters');
const siteSortElement = siteMainElement.querySelector('.trip-events');
const pointApiService = new PointApiService(END_POINT, AUTHORIZATION);
const offersModel = new OffersModel({ offersApiService: pointApiService });
const destinationsModel = new DestinationsModel({ destinationsApiService: pointApiService });
const pointsModel = new PointsModel({
  pointApiService: pointApiService,
  offersModel: offersModel,
  destinationsModel: destinationsModel,
});
const filterModel = new FiltersModel();

const mainPresenter = new MainPresenter({
  boardContainer: siteSortElement,
  filterModel: filterModel,
  pointsModel: pointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel,
  onNewPointDestroy: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView({
  onButtonClick: handleNewPointButtonClick
});

const headerPresenter = new HeaderPresenter(infoElement);

function handleNewPointButtonClick() {
  mainPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filterModel: filterModel,
  pointsModel: pointsModel
});

headerPresenter.init();
filterPresenter.init();
mainPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, infoElement, RenderPosition.BEFOREEND);
  });

