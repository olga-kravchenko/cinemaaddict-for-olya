import Abstract from "./abstract";

class Smart extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  updateData(newState, isUpdatingState) {
    if (!newState) {
      return;
    }
    this._data = Object.assign({}, this._data, newState);
    if (isUpdatingState) {
      return;
    }
    this.updateElement();
  }

  updateElement() {
    let oldChild = this.getElement();
    const parent = oldChild.parentElement;
    this.removeElement();
    const newChild = this.getElement();
    parent.replaceChild(newChild, oldChild);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}

export default Smart;
