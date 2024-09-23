import SortListView from '../view/sort-list-view';
import PoinPresenter from './point-presenter.js';
import ListView from '../view/list-view';
import EmptyPoinView from '../view/empty-point-view';
import HeaderPresenter from '../presenter/header-presenter';
import { render } from '../framework/render';
import { EmptyPhrase } from '../const.js';

export default class MainPresenter {
  #eventsList = new ListView();
  #eventSort = new SortListView();
  #headerContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];
  #offers = [];
  #destinations = [];
  constructor({ boardContainer, headerContainer, pointsModel, offersModel, destinationsModel }) {
    this.#boardContainer = boardContainer;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];
  }

  init() {
    if (this.#points.length === 0) {
      render(new EmptyPoinView({ message: EmptyPhrase.NO_POINTS }), this.#eventsList.element);
    }
    this.#renderList();
    this.#renderSort();
    this.#renderHeader();
  }

  #renderHeader() {
    const headerPresenter = new HeaderPresenter({
      headerContainer: this.#headerContainer
    });
    headerPresenter.init();
  }

  #renderList() {
    render(this.#eventsList, this.#boardContainer);
    this.#renderPoints();
  }

  #renderSort() {
    render(this.#eventSort, this.#boardContainer);
  }

  #renderPoints() {
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PoinPresenter({
      pointListContainer: this.#eventsList.element,
      destinations: this.#destinations,
      offers: this.#offers
    });
    pointPresenter.init(point);
  }
}
