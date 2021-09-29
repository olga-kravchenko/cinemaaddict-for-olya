import Abstract from "../view/abstract";

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }
  if (child instanceof Abstract) {
    child = child.getElement();
  }
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFORE_END:
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
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};

const replace = (newElement, oldElement) => {
  if (oldElement instanceof Abstract) {
    oldElement = oldElement.getElement();
  }
  if (newElement instanceof Abstract) {
    newElement = newElement.getElement();
  }
  const parentElement = oldElement.parentElement;
  if (parentElement === null || newElement === null) {
    throw new Error(`Can't replace unexisting elements`);
  }
  parentElement.replaceChild(newElement, oldElement);
};

export {RenderPosition, render, createElement, remove, replace};
