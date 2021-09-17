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
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 5;

const generateRandomElements = (array) => {
  const randomElements = [];
  for (let i = 0; i < getRandomNumber(MIN_QUANTITY, MAX_QUANTITY); i++) {
    randomElements.push(array[getRandomNumber(0, array.length)]);
  }
  return randomElements.join(` `);
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomNumber(1, maxDaysGap);
  return dayjs().add(daysGap, `day`).toDate();
};

const generateFilm = () => {
  return {
    id: nanoid(),
    filmInfo: {
      poster: POSTERS[getRandomNumber(0, POSTERS.length)],
      title: TITLES[getRandomNumber(0, TITLES.length)],
      originalTitle: ORIGINAL_TITLES[getRandomNumber(0, ORIGINAL_TITLES.length)],
      rating: getRandomNumber(0, 10),
      duration: `1h 36m`,
      description: generateRandomElements(DESCRIPTIONS),
      director: NAMES[getRandomNumber(0, NAMES.length)],
      screenwriters: generateRandomElements(NAMES),
      cast: generateRandomElements(NAMES),
      date: generateDate(),
      country: COUNTRIES[getRandomNumber(0, COUNTRIES.length)],
      genre: generateRandomElements(GENRES),
      ageRating: `+`,
    },
    comments: [],
    userDetails: {
      watchlist: STATES[getRandomNumber(0, STATES.length)],
      alreadyWatched: STATES[getRandomNumber(0, STATES.length)],
      watchingDate: generateDate(),
      favorite: STATES[getRandomNumber(0, STATES.length)],
    }
  };
};

export {generateFilm};
