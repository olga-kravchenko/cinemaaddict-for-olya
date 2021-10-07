import dayjs from "dayjs";

const SECONDS_QUANTITY_IN_MINUTE = 60;
const MINUTE_QUANTITY_IN_HOUR = 60;
const HOURS_QUANTITY_IN_DAY = 24;
const DAYS_QUANTITY_IN_MONTH = 30;
const MONTHS_QUANTITY_IN_YEAR = 12;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const formatTime = (minutes) => {
  return minutes <= MINUTE_QUANTITY_IN_HOUR ?
    `${minutes}m` :
    `${Math.floor((minutes / MINUTE_QUANTITY_IN_HOUR))}h ${minutes % MINUTE_QUANTITY_IN_HOUR}m`;
};

const convertFormat = (milliseconds) => {
  let format = ``;
  const second = 1000;
  const minutes = Math.floor((milliseconds / (second * SECONDS_QUANTITY_IN_MINUTE)));
  const hours = Math.floor((milliseconds / (minutes * MINUTE_QUANTITY_IN_HOUR)));
  const days = Math.floor((milliseconds / (hours * HOURS_QUANTITY_IN_DAY)));
  const months = Math.floor((milliseconds / (days * DAYS_QUANTITY_IN_MONTH)));
  const years = Math.floor((milliseconds / (months * MONTHS_QUANTITY_IN_YEAR)));

  if (minutes <= 1) {
    format = `now`;
  } else if (minutes < MINUTE_QUANTITY_IN_HOUR) {
    format = `a few minutes ago`;
  } else if (hours < HOURS_QUANTITY_IN_DAY) {
    format = `a few hour ago`;
  } else if (days < DAYS_QUANTITY_IN_MONTH) {
    format = `a ${days} days ago`;
  } else if (months < MONTHS_QUANTITY_IN_YEAR) {
    format = `a ${months} month ago`;
  } else if (months > MONTHS_QUANTITY_IN_YEAR) {
    format = `a ${years} years ago`;
  }
  return format;
};

const sortFilmsByDate = (filmA, filmB) => {
  return dayjs(filmA.filmInfo.date).diff(dayjs(filmB.filmInfo.date));
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

export {getRandomNumber, formatTime, convertFormat, sortFilmsByDate, sortFilmsByRating, copyFilm};
