import {getRandomNumber} from "../utils/render";

const createFilmsQuantityTemplate = () => {
  return `<p>${getRandomNumber(50, 1000)} movies inside</p>`;
};

export {createFilmsQuantityTemplate};
