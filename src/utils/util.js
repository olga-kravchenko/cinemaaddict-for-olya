import dayjs from "dayjs";

const MINUTE_QUANTITY_IN_HOUR = 60;
const HOUR_QUANTITY_IN_DAY = 24;
const DAY_QUANTITY_IN_MONTH = 30;
const MONTH_QUANTITY_IN_YEAR = 12;

const MINUTE = 1000 * 60;
const HOUR = MINUTE * MINUTE_QUANTITY_IN_HOUR;
const DAY = HOUR * HOUR_QUANTITY_IN_DAY;
const MONTH = DAY * DAY_QUANTITY_IN_MONTH;
const YEAR = MONTH * MONTH_QUANTITY_IN_YEAR;

const formatTime = (minutes) => {
  return minutes <= MINUTE_QUANTITY_IN_HOUR ?
    `${minutes}m` :
    `${Math.floor((minutes / MINUTE_QUANTITY_IN_HOUR))}h ${minutes % MINUTE_QUANTITY_IN_HOUR}m`;
};

const convertFormat = (milliseconds) => {
  let format = ``;
  const minutes = Math.floor((milliseconds / (MINUTE)));
  const hours = Math.floor((milliseconds / (HOUR)));
  const days = Math.floor((milliseconds / (DAY)));
  const months = Math.floor((milliseconds / (MONTH)));
  const years = Math.floor((milliseconds / (YEAR)));

  if (minutes <= 1) {
    format = `now`;
  } else if (minutes < MINUTE_QUANTITY_IN_HOUR) {
    format = `a few minutes ago`;
  } else if (hours < HOUR_QUANTITY_IN_DAY) {
    format = `a few hours ago`;
  } else if (days < DAY_QUANTITY_IN_MONTH) {
    format = `${days} days ago`;
  } else if (months < MONTH_QUANTITY_IN_YEAR) {
    format = `${months} month ago`;
  } else if (months > MONTH_QUANTITY_IN_YEAR) {
    format = `${years} years ago`;
  }
  return format;
};

const sortFilmsByDate = (filmA, filmB) => {
  return dayjs(filmA.filmInfo.release.date).diff(dayjs(filmB.filmInfo.release.date));
};

const sortFilmsByRating = (filmA, filmB) => {
  return (filmA.filmInfo.rating - filmB.filmInfo.rating);
};

const copyFilm = (initialFilm) => {
  const updatedFilm = Object.assign({}, initialFilm);
  updatedFilm.userDetails = Object.assign({}, initialFilm.userDetails);
  updatedFilm.filmInfo = Object.assign({}, initialFilm.filmInfo);
  return updatedFilm;
};

const commentAdaptToServer = (comment) => {
  const adaptedComment = Object.assign({}, comment);
  adaptedComment.date = comment.date.toISOString();

  return adaptedComment;
};

const isOnline = () => {
  return window.navigator.onLine;
};

export {formatTime, convertFormat, sortFilmsByDate, sortFilmsByRating, copyFilm, commentAdaptToServer, isOnline};
