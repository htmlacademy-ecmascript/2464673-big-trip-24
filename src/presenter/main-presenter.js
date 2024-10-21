import SortListView from '../view/sort-list-view';
import PointPresenter from './point-presenter';
import ListView from '../view/list-view';
import EmptyPoinView from '../view/empty-point-view';

import NewPointPresenter from './new-point-presentr';
import { render, RenderPosition } from '../framework/render';
import { updateItem, sorting } from '../utils-common';
import { EmptyPhrase, enabledSortType, SortType, UpdateType, UserAction} from '../const';
import { filter } from '../utils/filter';
import { sortPointTime, sortPointPrice, sortPointsByDay } from '../utils/point';
import { FilterType, LOADING } from '../const';
import { remove } from '../framework/render';

export default class MainPresenter {
  #eventsList = new ListView();
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointPresenters = new Map;
  #points = [];
  #offers = [];
  #destinations = [];
  #sortComponent = null;
  #emptyPointComponent = null;
  #currentFilterType = FilterType.EVERYTHING;
  #pointsLoading = null;
  #isLoading = true;
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #sortTypes = Object.values(SortType).map((type) => (
    {
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !enabledSortType[type]
    }));

  constructor({ boardContainer, onNewPointDestroy, filterModel, pointsModel, offersModel, destinationsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventsList.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onhandleViewAction: this.#handleViewAction,
      onNewPointDestroy: onNewPointDestroy,
    });
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#currentFilterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;

    const filteredPoints = filter[this.#currentFilterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }
    return filteredPoints.sort(sortPointsByDay);
  }

  init() {
    this.#renderList();
    this.#renderSort();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderEmptyPoint() {
    this.#emptyPointComponent = new EmptyPoinView({ message: EmptyPhrase[this.#currentFilterType] });
    render(this.#emptyPointComponent, this.#boardContainer);
  }

  #renderList() {
    if(this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if(!this.points.length) {
      this.#renderEmptyPoint();
      return;
    }
    this.#renderPointsList();
  }

  #renderPointsList() {
    render(this.#eventsList, this.#boardContainer);

    this.#renderPoints();
  }

  #renderLoading() {
    this.#pointsLoading = new EmptyPoinView({ message: LOADING });
    render(this.#pointsLoading, this.#boardContainer);
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

  #handleDataChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsList.element,
      pointDestination: this.#destinationsModel.getDestinationById(point.destination),
      typeOffers: this.#offersModel.getOffersByType(point.type),
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onDataChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange,
      onhandleViewAction: this.#handleViewAction,
      newPointPresenter: this.#newPointPresenter
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointsList({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => {
      presenter.destroy();
    });
    this.#pointPresenters.clear();

    if (this.#emptyPointComponent) {
      remove(this.#emptyPointComponent);
    }

    if (resetSortType) {
      remove(this.#sortComponent);
      remove(this.#pointsLoading);
      this.#currentSortType = SortType.DAY;
      this.#renderSort();
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, pointData) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(pointData.id).init(pointData, this.#offers, this.#destinations);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList({ resetSortType: true });
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#pointsLoading);
        this.#renderList();
        break;
    }
  };
}
