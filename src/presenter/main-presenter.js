import CreateFormView from '../view/create-form-view';
import EditFormView from '../view/edit-form-view';
import RoutePointView from '../view/route-point-view';
import SortListView from '../view/sort-list-view';
import ListView from '../view/list-view.js';
import { render } from '../framework/render';
import { EditType } from '../const.js';
export default class MainPresenter {
  #eventsList = new ListView();
  #boardContainer;
  #pointsModel;
  #offersModel;
  #destinationsModel;
  constructor({boardContainer, pointsModel, offersModel, destinationsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.points = [...this.#pointsModel.getPoints()];
    this.offers = [...this.#offersModel.getOffers()];
    this.destinations = [...this.#destinationsModel.getDestinations()];

    render(new SortListView(), this.#boardContainer);
    render(this.#eventsList, this.#boardContainer);

    render(new EditFormView({point: this.points[0], offers: this.offers, destinations: this.destinations, editType: EditType.EDIT}), this.#eventsList.element);

    render(new CreateFormView({point: this.points[0], offers: this.offers, destinations: this.destinations, editType: EditType.ADD}), this.#eventsList.element);

    for (let i = 0; i < this.points.length; i++) {
      render(new RoutePointView({point: this.points[i], offers: this.offers, destinations: this.destinations}), this.#eventsList.element);
    }
  }
}


