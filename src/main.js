import { render, RenderPosition } from './render.js';
import InfoView from './view/info-view.js';
import Filter from './view/filter-view.js';
import MainPresenter from './presenter/main-presenter.js';

const infoElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-body');
const siteHeaderElement = siteMainElement.querySelector('.trip-controls__filters');
const siteSortElement = siteMainElement.querySelector('.trip-events');
const boardPresenter = new MainPresenter({boardContainer: siteSortElement});


render(new InfoView(), infoElement, RenderPosition.AFTERBEGIN);
render(new Filter(), siteHeaderElement);

boardPresenter.init();

