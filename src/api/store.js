class Store {
  constructor(key, localStorage) {
    this._localStorage = localStorage;
    this._storageKey = key;
  }

  getItems() {
    try {
      return JSON.parse(this._localStorage.getItem(this._storageKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items) {
    this._localStorage.setItem(
        this._storageKey,
        JSON.stringify(items)
    );
  }

  setItem(id, value) {
    const store = this.getItems();
    for (let i = 0; i < store.length; i++) {
      if (store[i].id === id) {
        store[i] = value;
        break;
      }
    }
    this.setItems(store);
  }
}

export default Store;
