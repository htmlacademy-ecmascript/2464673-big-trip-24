import { mockDestinations } from '../mocks.js/destination';
import { mockOffers } from '../mocks.js/offers';
import { getRandomPoint } from '../mocks.js/points';
import { POINT_COUNT } from '../const';

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);
  offers = mockOffers;
  destinations = mockDestinations;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}


