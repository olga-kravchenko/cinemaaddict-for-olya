const MINUTE_QUANTITY_IN_HOUR = 60;

const UserStatus = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

const UserAction = {
  UPDATE_FILMS: `UPDATE_FILMS`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`,
};

const TimePeriod = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export {UserStatus, EMOTIONS, SortType, UpdateType, FilterType, UserAction, TimePeriod, MINUTE_QUANTITY_IN_HOUR};
