import { mockOffers } from '../mocks/offers';


export default class PointsModel {
  #offers = mockOffers;

  get offers() {
    return this.#offers;
  }
}
