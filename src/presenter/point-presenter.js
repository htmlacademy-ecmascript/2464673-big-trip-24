import RoutePointView from '../view/route-point-view';
import FormEditView from '../view/form-edit-view';
import { EditType, Mode } from '../const';
import { render, replace, remove } from '../framework/render';

export default class PointPresenter {
  #pointListContainer = null;
  #pointDestination = null;
  #typeOffers = [];
  #destinations = [];
  #offers = [];
  #point = null;
  #mode = Mode.DEFAULT;
  #pointComponent = null;
  #pointEditComponent = null;
  #editType = EditType.EDIT;
  #hendleDataChange = null;
  #handleModeChange = null;

  constructor({ pointDestination, typeOffers, onDataChange, onModeChange, pointListContainer, destinations, offers }) {
    this.#pointListContainer = pointListContainer;
    this.#pointDestination = pointDestination;
    this.#typeOffers = typeOffers;
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
      typeOffers: this.#typeOffers,
      pointDestination: this.#pointDestination,
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevFormEditComponent);
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceEditPointToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToEditPoint() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditPointToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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
  };

  #onCloseEditButtonClick = () => {
    this.#replaceEditPointToPoint();
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
