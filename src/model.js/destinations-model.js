import { mockDestinations } from '../mocks.js/destination';

export default class PointsModel {
  destinations = mockDestinations;

  getDestinations() {
    return this.destinations;
  }
}
