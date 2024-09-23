import RoutePointView from '../view/route-point-view';
import FormEditView from '../view/form-edit-view';
import { EditType } from '../const';

import { render, replace } from '../framework/render';

export default class PoinPresenter {
  #pointListContainer = null;
  #destinations = null;
  #offers = null;
  #point = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #editType = EditType.EDIT;

  constructor({ pointListContainer, destinations, offers }) {
    this.#pointListContainer = pointListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init(point) {
    this.#point = point;
    this.#pointComponent = new RoutePointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onOpenEditButtonClick: this.#onOpenEditButtonClick
    });

    this.#pointEditComponent = new FormEditView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      editType: this.#editType,
      onCloseEditButtonClick: this.#onCloseEditButtonClick,
      onSubmitButtonClick: this.#onSubmitButtonClick
    });

    render(this.#pointComponent, this.#pointListContainer);
  }

  #replacePointToEditPoint() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceEditPointToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditPointToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onOpenEditButtonClick = () => {
    this.#replacePointToEditPoint();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onCloseEditButtonClick = () => {
    this.#replaceEditPointToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onSubmitButtonClick = () => {
    this.#replaceEditPointToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

}
