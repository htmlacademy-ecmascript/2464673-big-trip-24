import CreateForm from '../view/create-form-view';
import EditForm from '../view/edit-form-view';
import RoutePoint from '../view/route-point-view';
import SortList from '../view/sort-list-view';
import List from '../view/list-view.js';

import { render } from '../render';

const POINTS_NUMBER = 3;

export default class MainPresenter {
  eventsList = new List();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    // render(this.boardComponent, this.boardContainer);
    render(new SortList(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    const editingPointElement = new EditForm().getElement();
    this.eventsList.addItem(editingPointElement);
    const creationPointElement = new CreateForm().getElement();
    this.eventsList.addItem(creationPointElement);
    for (let i = 0; i < POINTS_NUMBER; i++) {
      const pointElement = new RoutePoint().getElement();
      this.eventsList.addItem(pointElement);
    }
  }
}

// render(new EditForm(), this.boardContainer, RenderPosition.BEFOREEND);
// render(new CreateForm(), this.boardContainer, RenderPosition.BEFOREEND);
// render(new SortList(), this.boardContainer, RenderPosition.BEFOREEND);
// for (let i = 0; i < POINTS_NUMBER; i++) {
//   render(new RoutePoint(), this.boardContainer.getElement());
// }
// }
// }
