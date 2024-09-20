import AbstractView from '../framework/view/abstract-view';
import { capitalizedString } from '../utils-common';
import { Attribute, FilterType } from '../const';

function createFilterItemTemplate(filter) {
  const {type, count} = filter;
  return (
    `<div class="trip-filters__filter">
    <input id="filter-${type}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio" name="trip-filter" value="${type}"
    ${FilterType.EVERYTHING ? Attribute.CHECKED : ''}
    ${count === 0 ? Attribute.DISABLED : ''}>
    <label class="trip-filters__filter-label"
    for="filter-${type}">${capitalizedString(type)}</label>
    </div>`
  );
}

function createFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter)).join('');
  return (`
    <form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
          </form>
    `);
}

export default class FilterView extends AbstractView{
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
