import InfoView from '../view/info-view';
import { render, RenderPosition } from '../framework/render';

export default class HeaderPresenter {
  #headerContainer = null;
  #infoComponent = new InfoView();
  #pointsModel = null;

  constructor({ headerContainer, pointsModel,  }) {
    this.#headerContainer = headerContainer;
  }

  init() {
    render(this.#infoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
