import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class PointsModel extends Observable {
  #points = [];
  #pointApiService = null;
  #offrsModel = null;
  #destinationsModel = null;

  constructor({ pointApiService, offersModel, destinationsModel }) {
    super();
    this.#pointApiService = pointApiService;
    this.#offrsModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      await this.#offrsModel.init();
      await this.#destinationsModel.init();
      const points = await this.#pointApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, pointUpdate) {
    const index = this.#points.findIndex((point) => point.id === pointUpdate.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    try {

      const response = await this.#pointApiService.updatePoint(pointUpdate);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, pointUpdate);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, newPoint) {
    try {
      const response = await this.#pointApiService.addPoint(newPoint);
      const adaptPoint = this.#adaptToClient(response);
      this.#points = [adaptPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, pointForDelete) {
    const index = this.#points.findIndex((point) => point.id === pointForDelete.id);

    if (index === -1) {
      throw new Error('Can\'t delete non-existent point');
    }

    try {
      await this.#pointApiService.deletePoint(pointForDelete);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, pointForDelete);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

}

