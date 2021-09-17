const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {getRandomNumber, render};
