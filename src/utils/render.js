const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {getRandomNumber, render};
