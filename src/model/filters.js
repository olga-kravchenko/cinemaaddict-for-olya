import Observer from "../utils/observer.js";
import {FilterType} from "../constants";

class Filters extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updatedType, filter) {
    this._activeFilter = filter;
    this._notify(updatedType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}

export default Filters;
