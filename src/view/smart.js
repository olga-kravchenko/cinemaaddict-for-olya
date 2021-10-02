import Abstract from "./abstract";

class Smart extends Abstract {
  constructor(data) {
    super();
    this.data = data;
  }

  updateState(newState, isUpdatingState) {
    this.data = Object.assign({}, this.data, newState);

    if (isUpdatingState) {
      this.updateElement();
    }
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
