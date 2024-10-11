import SortListView from '../view/sort-list-view';
import PointPresenter from './point-presenter';
import ListView from '../view/list-view';
import EmptyPoinView from '../view/empty-point-view';
import HeaderPresenter from '../presenter/header-presenter';
import { render, RenderPosition } from '../framework/render';
import { updateItem, sorting } from '../utils-common';
import { EmptyPhrase, enabledSortType, SortType, UpdateType} from '../const';
import { filter } from '../utils/filter';
import { sortPointTime, sortPointPrice } from '../utils/point';
import { FilterType } from '../const';

export default class MainPresenter {
  #eventsList = new ListView();
  #headerContainer = null;
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
  #currentFilterType = FilterType.EVERYTHING;
  #filterType = null;
  #currentSortType = SortType.DAY;
  #sortTypes = Object.values(SortType).map((type) => (
    {
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !enabledSortType[type]
    }));

  constructor({ boardContainer, headerContainer, filterModel, pointsModel, offersModel, destinationsModel }) {
    this.#boardContainer = boardContainer;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];
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
    return this.#pointsModel.points;
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
    // this.#points.forEach((point) => this.#renderPoint(point));
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsList.element,
      pointDestination: this.#destinationsModel.getDestinationById(point.destination),
      typeOffers: this.#offersModel.getOffersByType(point.type),
      destinations: this.#destinations,
      offers: this.#offers,
      onDataChange: this.#handleDataChange,
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
    }
  };
}
