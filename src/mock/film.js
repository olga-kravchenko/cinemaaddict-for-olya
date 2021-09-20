import {nanoid} from 'nanoid';
import dayjs from "dayjs";
import {getRandomNumber} from "../utils/util";
import {EMOTIONS, MIN_ARRAY_INDEX} from "../constants";

const TITLES = [
  `Зеленая миля`, `Побег из Шоушенка`,
  `Форрест Гамп`, `Интерстеллар`,
  `Иван Васильевич меняет профессию`,
  `Список Шиндлера`, `Матрица`, `1+1`,
  `Назад в будущее`, `Джентльмены`,
  `Бойцовский клуб`, `Шрэк`, `Огнеупорный`
];
const ORIGINAL_TITLES = [
  `Зеленая миля - The Green Mile`, `Побег из Шоушенка - Escape from Shawshank`,
  `Форрест Гамп - Forrest Gump`, `Интерстеллар - Interstellar`,
  `Иван Васильевич меняет профессию - Ivan Vasilyevich changes his profession`,
  `Список Шиндлера - Schindler's List`, `Матрица - The Matrix`, `1+1 - 1+1`,
  `Назад в будущее - Back to the future`, `Джентльмены - Gentlemen`,
  `Бойцовский клуб - Fight Club`, `Шрэк - Shrek`, `Огнеупорный - Fireproof`
];
const SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const POSTERS = [
  `made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];
const COUNTRIES = [`USA`, `Russia`, `UK`, `OAO`, `Belarus`, `Latvia`, `Ukraine`, `Mexican`, `Australia`];
const GENRES = [`Боевик`, `Вестерн`, `Детектив`, `Комедия`, `Мелодрама`, `Драма`, `Приключенческий`, `Исторический`];
const NAMES = [`Anthony Mann`, `Heinz Herald`, `Richard Weil`, `Erich von Stroheim`, `Mary Beth`, `Dan Duryea`];
const STATES = [true, false];
const AGE_RATING = [0, 12, 18];
const MAX_QUANTITY = 5;
const MIN_QUANTITY = 1;
const MAX_DURATION = 180;
const MIN_DURATION = 30;
const MIN_RATING = 0;
const MAX_RATING = 10;

const generateRandomElements = (array) => {
  const randomElements = [];
  for (let i = 0; i < getRandomNumber(MIN_QUANTITY, MAX_QUANTITY); i++) {
    randomElements.push(array[getRandomNumber(MIN_ARRAY_INDEX, array.length)]);
  }
  const uniqueElements = new Set(randomElements);
  return Array.from(uniqueElements);
};

const generateDate = () => {
  const maxDaysGap = 10000;
  const daysGap = getRandomNumber(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, `day`).toDate();
};

const generateComment = () => {
  return {
    author: NAMES[getRandomNumber(MIN_ARRAY_INDEX, NAMES.length)],
    comment: SENTENCES[getRandomNumber(MIN_ARRAY_INDEX, SENTENCES.length)],
    date: generateDate(),
    emotion: EMOTIONS[getRandomNumber(MIN_ARRAY_INDEX, EMOTIONS.length)],
  };
};

const generateComments = () => {
  const shownComments = [];
  for (let i = 0; i < getRandomNumber(MIN_QUANTITY, MAX_QUANTITY); i++) {
    const comment = generateComment();
    shownComments.push(comment);
  }
  return shownComments;
};

const getRandomRating = (min, max) => {
  let randomNumber = Math.floor(min + (max - min + 1) * 10 * Math.random()) / 10;
  while (Math.floor(randomNumber) === randomNumber) {
    randomNumber = Math.floor(min + (max - min + 1) * 10 * Math.random()) / 10;
  }
  return randomNumber;
};

const generateFilm = () => {
  const randomTitleIndex = getRandomNumber(MIN_ARRAY_INDEX, TITLES.length - 1);
  return {
    id: nanoid(),
    filmInfo: {
      poster: POSTERS[getRandomNumber(MIN_ARRAY_INDEX, POSTERS.length)],
      title: TITLES[randomTitleIndex],
      originalTitle: ORIGINAL_TITLES[randomTitleIndex],
      rating: getRandomRating(MIN_RATING, MAX_RATING),
      duration: getRandomNumber(MIN_DURATION, MAX_DURATION),
      description: generateRandomElements(SENTENCES),
      director: NAMES[getRandomNumber(MIN_ARRAY_INDEX, NAMES.length)],
      screenwriters: generateRandomElements(NAMES),
      actors: generateRandomElements(NAMES),
      date: generateDate(),
      country: COUNTRIES[getRandomNumber(MIN_ARRAY_INDEX, COUNTRIES.length)],
      genre: generateRandomElements(GENRES),
      ageRating: AGE_RATING[getRandomNumber(MIN_ARRAY_INDEX, AGE_RATING.length)],
    },
    comments: generateComments(),
    userDetails: {
      watchlist: STATES[getRandomNumber(MIN_ARRAY_INDEX, STATES.length)],
      alreadyWatched: STATES[getRandomNumber(MIN_ARRAY_INDEX, STATES.length)],
      watchingDate: generateDate(),
      favorite: STATES[getRandomNumber(MIN_ARRAY_INDEX, STATES.length)],
    }
  };
};

export {generateFilm};
