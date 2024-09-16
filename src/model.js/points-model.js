import { getRandomPoint } from '../mocks.js/points';
import { POINT_COUNT } from '../const';

export default class PointsModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }
}


