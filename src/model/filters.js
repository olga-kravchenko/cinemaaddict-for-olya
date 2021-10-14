import Observer from "../utils/observer.js";
import {FilterType, UpdateType} from "../constants";

class Filters extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  set filters(filter) {
    this._activeFilter = filter;
    this._notify(UpdateType.MAJOR, filter);
  }

  get filters() {
    return this._activeFilter;
  }
}

export default Filters;
