import Observer from "../utils/observer.js";
import {FilterType} from "../constants";

class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}

export default Filter;
