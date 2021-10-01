import dayjs from "dayjs";

const MINUTE_QUANTITY_IN_HOUR = 60;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const formatTime = (minutes) => {
  return minutes <= MINUTE_QUANTITY_IN_HOUR ?
    `${minutes}m` :
    `${Math.floor((minutes / MINUTE_QUANTITY_IN_HOUR))}h ${minutes % MINUTE_QUANTITY_IN_HOUR}m`;
};

const convertFormat = (milliseconds) => {
  let format = ``;
  const minutes = Math.floor((milliseconds / (1000 * 60)));
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)));
  const days = Math.floor((milliseconds / (1000 * 60 * 60 * 24)));
  const months = Math.floor((milliseconds / (1000 * 60 * 60 * 24 * 30)));
  const years = Math.floor((milliseconds / (1000 * 60 * 60 * 24 * 30 * 12)));


  if (minutes <= 1) {
    format = `now`;
  } else if (minutes < 60) {
    format = `a few minutes ago`;
  } else if (hours < 24) {
    format = `a few hour ago`;
  } else if (days < 30) {
    format = `a ${days} days ago`;
  } else if (months < 12) {
    format = `a ${months} month ago`;
  } else if (months > 12) {
    format = `a ${years} years ago`;
  }
  return format;
};

const updateElementInArrayByIndex = (array, updatedElement) => {
  const index = array.findIndex((element) => element.id === updatedElement.id);
  if (index === -1) {
    return array;
  }
  array[index] = updatedElement;
  return array;
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

export {getRandomNumber, formatTime, convertFormat, updateElementInArrayByIndex, sortFilmsByDate, sortFilmsByRating, copyFilm};
