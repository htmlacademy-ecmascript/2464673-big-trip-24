import { getRandomPoint } from '../mocks/points';
import { POINT_COUNT } from '../const';
import Observable from '../framework/observable';
export default class PointsModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }

  updatepoint(updateType, pointUpdate) {
    const index = this.#points.findIndex((point) => point.id === pointUpdate.id);

    if(index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      pointUpdate,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, pointUpdate);
  }

  addPoint(updateType, newPoint) {
    this.#points = [
      ...this.#points,
      newPoint
    ];

    this._notify(updateType,newPoint);
  }

  deletePoint(updateType, pointForDelete) {
    const index = this.#points.findIndex((point) => point.id === pointForDelete.id);

    if(index === -1) {
      throw new Error ('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }

}

