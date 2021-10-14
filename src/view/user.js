import SmartView from "./smart";
import {getUserStatus} from "../utils/stats";

const createUserTemplate = (films) => {
  const status = getUserStatus(films);
  return `
    <section class="header__profile profile">
      ${status ? `<p class="profile__rating">${status}</p>` : ``}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

class User extends SmartView {
  constructor(films) {
    super(films);
  }

  getTemplate() {
    return createUserTemplate(this.data);
  }

  restoreHandlers() {
  }
}

export default User;
