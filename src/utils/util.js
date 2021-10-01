import dayjs from "dayjs";

const MINUTE_QUANTITY_IN_HOUR = 60;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const formatTime = (minutes) => {
  return minutes <= MINUTE_QUANTITY_IN_HOUR ?
    `${minutes}m` :
    `${Math.floor((minutes / MINUTE_QUANTITY_IN_HOUR))}h ${minutes % MINUTE_QUANTITY_IN_HOUR}m`;
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

const updateFilm = (initialFilm) => {
  const updatedFilm = Object.assign({}, initialFilm);
  updatedFilm.userDetails = Object.assign({}, initialFilm.userDetails);
  updatedFilm.filmInfo = Object.assign({}, initialFilm.filmInfo);
  return updatedFilm;
};

export {getRandomNumber, formatTime, updateElementInArrayByIndex, sortFilmsByDate, sortFilmsByRating, updateFilm};
