import { mockDestinations } from '../mocks.js/destination';

export default class PointsModel {
  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }
}
