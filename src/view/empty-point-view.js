import AbstractView from '../framework/view/abstract-view';
import { EmptyPhrase } from '../const';

function createEmptyListPointTemplate(filterType) {
  return `<p class="trip-events__msg">${EmptyPhrase[filterType.toUpperCase()]}</p>`;
}

export default class EmptyPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {

    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListPointTemplate(this.#filterType);
  }
}
