import {nanoid} from 'nanoid';
import dayjs from "dayjs";
import {getRandomNumber} from "../utils/util";
import {EMOTIONS} from "../constants";

const TITLES = [
  `Зеленая миля`, `Побег из Шоушенка`, `Форрест Гамп`, `Интерстеллар`, `Иван Васильевич меняет профессию`,
  `Список Шиндлера`, `Матрица`, `1+1`, `Назад в будущее`, `Джентльмены`, `Бойцовский клуб`, `Шрэк`, `Огнеупорный`
];
const ORIGINAL_TITLES = [
  `The Green Mile`, `Escape from Shawshank`, `Forrest Gump`, `Interstellar`, `Ivan Vasilyevich changes his profession`,
  `Schindler's List`, `The Matrix`, `1+1`, `Back to the future`, `Gentlemen`, `Fight Club`, `Shrek`, `Fireproof`
];
const SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante sed finibus eget, sollicitudin eget .`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const POSTERS = [
  `made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`
];
const COUNTRIES = [`USA`, `Russia`, `UK`, `OAO`, `Belarus`, `Latvia`, `Ukraine`, `Mexican`, `Australia`];
const GENRES = [`Боевик`, `Вестерн`, `Детектив`, `Комедия`, `Мелодрама`, `Драма`, `Приключенческий`, `Исторический`];
const NAMES = [`Anthony Mann`, `Heinz Herald`, `Richard Weil`, `Erich von Stroheim`, `Mary Beth`, `Dan Duryea`];
const STATES = [true, false];
const AGE_RATING = [0, 12, 18];
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 5;
const MIN_DURATION = 30;
const MAX_DURATION = 180;
const MAX_RATING = 10.1;

const generateRandomElements = (array) => {
  const elementQuantity = getRandomNumber(MIN_QUANTITY, MAX_QUANTITY);
  const uniqueElements = new Set();
  while (uniqueElements.size < elementQuantity) {
    uniqueElements.add(array[getRandomNumber(0, array.length)]);
  }
  return Array.from(uniqueElements);
};

const generateDate = () => {
  const maxYearGap = 30;
  const daysGap = getRandomNumber(-maxYearGap, maxYearGap);
  return dayjs().add(daysGap, `year`).toDate();
};

const generateComment = () => {
  return {
    id: nanoid(),
    author: NAMES[getRandomNumber(0, NAMES.length)],
    comment: SENTENCES[getRandomNumber(0, SENTENCES.length)],
    date: generateDate(),
    emotion: EMOTIONS[getRandomNumber(0, EMOTIONS.length)],
  };
};

const IdToMap = new Map();

const generateComments = () => {
  const comments = [];
  for (let i = 0; i < getRandomNumber(MIN_QUANTITY, MAX_QUANTITY); i++) {
    const comment = generateComment();
    IdToMap.set(comment.id, comment);
    comments.push(comment);
  }
  return comments;
};

const getRandomRating = (max) => {
  return (Math.random() * max).toFixed(1);
};

const generateFilm = () => {
  const randomTitleIndex = getRandomNumber(0, TITLES.length - 1);
  return {
    id: nanoid(),
    filmInfo: {
      poster: POSTERS[getRandomNumber(0, POSTERS.length)],
      title: TITLES[randomTitleIndex],
      originalTitle: ORIGINAL_TITLES[randomTitleIndex],
      rating: getRandomRating(MAX_RATING),
      duration: getRandomNumber(MIN_DURATION, MAX_DURATION),
      description: generateRandomElements(SENTENCES).join(``),
      director: NAMES[getRandomNumber(0, NAMES.length)],
      screenwriters: generateRandomElements(NAMES),
      actors: generateRandomElements(NAMES),
      date: generateDate(),
      country: COUNTRIES[getRandomNumber(0, COUNTRIES.length)],
      genres: generateRandomElements(GENRES),
      ageRating: AGE_RATING[getRandomNumber(0, AGE_RATING.length)],
    },
    comments: generateComments().map((c) => c.id),
    userDetails: {
      watchlist: STATES[getRandomNumber(0, STATES.length)],
      alreadyWatched: STATES[getRandomNumber(0, STATES.length)],
      watchingDate: generateDate(),
      favorite: STATES[getRandomNumber(0, STATES.length)],
    }
  };
};

export {generateFilm, IdToMap};
