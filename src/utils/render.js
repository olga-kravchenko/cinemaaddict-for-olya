import AbstractView from "../view/abstract";
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, child, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template.trim();

  return newElement.firstChild;
};

const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
export {RenderPosition, render, createElement, remove};
