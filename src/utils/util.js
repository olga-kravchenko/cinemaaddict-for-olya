import dayjs from "dayjs";

const MINUTE_QUANTITY_IN_HOUR = 60;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const formatTime = (minutes) => {
  return minutes <= MINUTE_QUANTITY_IN_HOUR ?
    `${minutes}m` :
    `${Math.floor((minutes / MINUTE_QUANTITY_IN_HOUR))}h ${minutes % MINUTE_QUANTITY_IN_HOUR}m`;
};

const updateElements = (element, updatedElement) => {
  const index = element.findIndex((item) => item.id === updatedElement.id);
  if (index === -1) {
    return element;
  }
  return [...element.slice(0, index), updatedElement, ...element.slice(index + 1)];
};

const sortFilmsByDate = (filmA, filmB) => {
  return dayjs(filmA.filmInfo.date).diff(dayjs(filmB.filmInfo.date));
};

const sortFilmsByRating = (filmA, filmB) => {
  return (filmA.filmInfo.rating - filmB.filmInfo.rating);
};


export {getRandomNumber, formatTime, updateElements, sortFilmsByDate, sortFilmsByRating};
