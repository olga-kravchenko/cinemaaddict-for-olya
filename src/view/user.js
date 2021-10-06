import Abstract from "./abstract";
import {getUserStatus} from "../utils/stats";

const createUserTemplate = (films) => {
  const status = getUserStatus(films);
  return `
    <section class="header__profile profile">
      ${status ? `<p class="profile__rating">${status}</p>` : ``}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

class User extends Abstract {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createUserTemplate(this._films);
  }
}

export default User;
