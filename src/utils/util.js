import dayjs from "dayjs";

const MINUTE_QUANTITY_IN_HOUR = 60;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const formatTime = (minutes) => {
  return minutes <= MINUTE_QUANTITY_IN_HOUR ?
    `${minutes}m` :
    `${Math.floor((minutes / MINUTE_QUANTITY_IN_HOUR))}h ${minutes % MINUTE_QUANTITY_IN_HOUR}m`;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

const sortFilmDate = (filmA, filmB) => {
  return dayjs(filmA.filmInfo.date).diff(dayjs(filmB.filmInfo.date));
};

const sortFilmRating = (filmA, filmB) => {
  return (filmA.filmInfo.rating - filmB.filmInfo.rating);
};


export {getRandomNumber, formatTime, updateItem, sortFilmDate, sortFilmRating};
