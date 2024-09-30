import SortListView from '../view/sort-list-view';
import PoinPresenter from './point-presenter';
import ListView from '../view/list-view';
import EmptyPoinView from '../view/empty-point-view';
import HeaderPresenter from '../presenter/header-presenter';
import { render, RenderPosition } from '../framework/render';
import { updateItem, sorting } from '../utils-common';
import { EmptyPhrase, enabledSortType, SortType } from '../const';

export default class MainPresenter {
  #eventsList = new ListView();
  #headerContainer = null;
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointPresenters = new Map;
  #points = [];
  #offers = [];
  #destinations = [];
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #sortTypes = Object.values(SortType).map((type) => (
    {
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !enabledSortType[type]
    }));

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
    this.#handleSortTypeChange(this.#currentSortType);
  }

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#points = sorting[this.#currentSortType](this.#points);
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortComponent = new SortListView({
      sortTypes: this.#sortTypes,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #hendleDataChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #renderPoints() {
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PoinPresenter({
      pointListContainer: this.#eventsList.element,
      destinations: this.#destinations,
      offers: this.#offers,
      onDataChange: this.#hendleDataChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => {
      presenter.destroy();
    });
    this.#pointPresenters.clear();
  }
}
