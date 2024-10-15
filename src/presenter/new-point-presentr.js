import {render, RenderPosition, remove} from '../framework/render';
import { UserAction, UpdateType, EditType } from '../const';
import { nanoid } from 'nanoid';
import FormEditView from '../view/form-edit-view';
import DestinationsModel from '../model/destinations-model';
import OffersModel from '../model/offers-model';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleViewAction = null;
  #handleDestroy = null;
  #editType = EditType.ADD;
  #destinatiosModel = new DestinationsModel;
  #offersModel = new OffersModel;
  #pointAddComponent = null;

  constructor({pointListContainer, onhandleViewAction, onNewPointDestroy }) {
    this.#pointListContainer = pointListContainer;
    this.#handleViewAction = onhandleViewAction;
    this.#handleDestroy = onNewPointDestroy;//раздизейбливает кнопку нев ивент
  }

  init() {
    if(this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new FormEditView({
      offers: this.#offersModel.offers,
      destinations: this.#destinatiosModel.destinations,
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

  #handleFormSubmit = (point) => {
    this.#handleViewAction(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
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
