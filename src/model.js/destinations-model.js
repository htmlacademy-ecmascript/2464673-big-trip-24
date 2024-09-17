import { mockDestinations } from '../mocks/destination';

export default class PointsModel {
  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }
}
