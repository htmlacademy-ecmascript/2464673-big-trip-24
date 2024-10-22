import {render, RenderPosition, remove} from '../framework/render';
import { UserAction, UpdateType, EditType } from '../const';
import FormEditView from '../view/form-edit-view';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleViewAction = null;
  #handleDestroy = null;
  #editType = EditType.ADD;
  #destinationsModel = null;
  #offersModel = null;
  #pointAddComponent = null;

  constructor({pointListContainer, onhandleViewAction, destinationsModel, offersModel, onNewPointDestroy }) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleViewAction = onhandleViewAction;
    this.#handleDestroy = onNewPointDestroy;
  }

  init() {
    if(this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new FormEditView({
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
      editType: this.#editType,
      onDeleteClick: this.#handleDeleteClick,
      onSubmitButtonClick: this.#handleFormSubmit,
    });
    render(this.#pointAddComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDounHaldler);
  }

  destroy() {
    if(this.#pointAddComponent === null) {
      return;
    }
    remove(this.#pointAddComponent);
    this.#pointAddComponent = null;
    this.#handleDestroy();
    document.removeEventListener('keydown', this.#escKeyDounHaldler);
  }

  setSaving() {
    this.#pointAddComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointAddComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointAddComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleViewAction(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDounHaldler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
