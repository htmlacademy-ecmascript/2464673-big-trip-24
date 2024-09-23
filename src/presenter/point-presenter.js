import RoutePointView from '../view/route-point-view';
import FormEditView from '../view/form-edit-view';
import { EditType } from '../const';

import { render, replace, remove } from '../framework/render';

export default class PoinPresenter {
  #pointListContainer = null;
  #destinations = null;
  #offers = null;
  #point = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #editType = EditType.EDIT;
  #hendleDataChange = null;
  #handleModeChange = null;

  constructor({ onDataChange, onModeChange, pointListContainer, destinations, offers }) {
    this.#pointListContainer = pointListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#hendleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#pointEditComponent;

    this.#pointComponent = new RoutePointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onOpenEditButtonClick: this.#onOpenEditButtonClick,
      onFavoriteClick: this.#favoriteClickHendler
    });

    this.#pointEditComponent = new FormEditView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      editType: this.#editType,
      onCloseEditButtonClick: this.#onCloseEditButtonClick,
      onSubmitButtonClick: this.#onSubmitButtonClick
    });

    if (!prevPointComponent || !prevFormEditComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevFormEditComponent.element)) {
      replace(this.#pointEditComponent, prevFormEditComponent);
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToEditPoint() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
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

  #onSubmitButtonClick = (point) => {
    this.#hendleDataChange(point);
    this.#replaceEditPointToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #favoriteClickHendler = () => {
    this.#hendleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };
}
