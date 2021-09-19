import {nanoid} from 'nanoid';
import dayjs from "dayjs";
import {getRandomNumber} from "../utils/render";

const TITLES = [`Зеленая миля`, `Побег из Шоушенка`, `Форрест Гамп`, `Интерстеллар`, `Иван Васильевич меняет профессию`,
  `Список Шиндлера`, `Матрица`, `1+1`, `Назад в будущее`, `Джентльмены`, `Бойцовский клуб`, `Шрэк`, `Огнеупорный`];

const ORIGINAL_TITLES = [`Зеленая миля - Зеленая миля`, `Побег из Шоушенка - Побег из Шоушенка`,
  `Форрест Гамп - Форрест Гамп`, `Интерстеллар - Интерстеллар`, `Иван Васильевич меняет профессию - Иван Васильевич меняет профессию`,
  `Список Шиндлера - Список Шиндлера`, `Матрица - Матрица`, `1+1 - 1+1`, `Назад в будущее - Назад в будущее`, `Джентльмены - Джентльмены`,
  `Бойцовский клуб - Бойцовский клуб`, `Шрэк - Шрэк`, `Огнеупорный - Огнеупорный`];

const DESCRIPTIONS = [
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

const POSTERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
const COUNTRIES = [`USA`, `Russia`, `UK`, `OAO`, `Belarus`, `Latvia`, `Ukraine`, `Mexican`, `Australia`];
const GENRES = [`Боевик`, `Вестерн`, `Детектив`, `Комедия`, `Мелодрама`, `Драма`, `Сказка`, `Приключенческий`, `Исторический`];
const NAMES = [`Anthony Mann`, `Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Erich von Stroheim`, `Mary Beth`, `Dan Duryea`];
const STATES = [true, false];
const AGE_RATING = [3, 6, 0, 12, 16, 18, 90];
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 5;
const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

const generateRandomElements = (array) => {
  const randomElements = [];
  for (let i = 0; i < getRandomNumber(MIN_QUANTITY, MAX_QUANTITY); i++) {
    randomElements.push(array[getRandomNumber(0, array.length)]);
  }
  return randomElements;
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomNumber(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, `day`).toDate();
};

const generateComment = () => {
  return {
    author: NAMES[getRandomNumber(0, NAMES.length)],
    comment: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length)],
    date: generateDate(),
    emotion: EMOTIONS[getRandomNumber(0, EMOTIONS.length)],
  };
};

const generateComments = () => {
  const shownComments = [];
  for (let i = 0; i < getRandomNumber(1, 5); i++) {
    const comment = generateComment();
    shownComments.push(comment);
  }
  return shownComments;
};

const generateFilm = () => {
  const randomIndex = getRandomNumber(0, TITLES.length - 1);
  return {
    id: nanoid(),
    filmInfo: {
      poster: POSTERS[getRandomNumber(0, POSTERS.length)],
      title: TITLES[randomIndex],
      originalTitle: ORIGINAL_TITLES[randomIndex],
      rating: getRandomNumber(0, 10),
      duration: getRandomNumber(30, 180),
      description: generateRandomElements(DESCRIPTIONS),
      director: NAMES[getRandomNumber(0, NAMES.length)],
      screenwriters: generateRandomElements(NAMES),
      actors: generateRandomElements(NAMES),
      date: generateDate(),
      country: COUNTRIES[getRandomNumber(0, COUNTRIES.length)],
      genre: generateRandomElements(GENRES),
      ageRating: AGE_RATING[getRandomNumber(0, AGE_RATING.length)],
    },
    comments: generateComments(),
    userDetails: {
      watchlist: STATES[getRandomNumber(0, STATES.length)],
      alreadyWatched: STATES[getRandomNumber(0, STATES.length)],
      watchingDate: generateDate(),
      favorite: STATES[getRandomNumber(0, STATES.length)],
    }
  };
};

export {EMOTIONS, generateFilm};
