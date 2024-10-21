import RoutePointView from '../view/route-point-view';
import FormEditView from '../view/form-edit-view';
import { EditType, Mode, UpdateType, UserAction } from '../const';
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
  #handleDataChange = null;
  #handleModeChange = null;
  #handleViewAction = null;
  #newPointPresenter = null;

  constructor({ pointDestination, newPointPresenter, typeOffers, onDataChange, onModeChange, onhandleViewAction, pointListContainer, destinations, offers }) {
    this.#pointListContainer = pointListContainer;
    this.#pointDestination = pointDestination;
    this.#typeOffers = typeOffers;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#handleViewAction = onhandleViewAction;
    this.#newPointPresenter = newPointPresenter;
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
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new FormEditView({
      point: this.#point,
      typeOffers: this.#typeOffers,
      pointDestination: this.#pointDestination,
      offers: this.#offers,
      destinations: this.#destinations,
      editType: this.#editType,
      onCloseEditButtonClick: this.#onCloseEditButtonClick,
      onSubmitButtonClick: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
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
    this.#newPointPresenter.destroy();
    this.#replacePointToEditPoint();
  };

  #onCloseEditButtonClick = () => {
    this.#replaceEditPointToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#handleViewAction(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...point}
    );
    this.#replaceEditPointToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (point) => {
    this.#handleViewAction(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #handleFavoriteClick = () => {
    this.#handleViewAction(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };
}
