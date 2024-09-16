import { mockOffers } from '../mocks.js/offers';


export default class PointsModel {
  #offers = mockOffers;

  get offers() {
    return this.#offers;
  }
}
