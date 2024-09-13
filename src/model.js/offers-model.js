import { mockOffers } from '../mocks.js/offers';


export default class PointsModel {
  offers = mockOffers;

  getOffers() {
    return this.offers;
  }
}
