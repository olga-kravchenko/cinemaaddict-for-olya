import SmartView from "./smart";

const createStatisticStatesTemplate = () => {
  const stateNames = [`All time`, `Today`, `Week`, `Month`, `Year`];
  const statisticsStates = stateNames.map((name) => `
   <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${name.toLowerCase()}" value="${name.toLowerCase()}" ${name === `All time` ? `checked` : `` }>
      <label for="statistic-${name.toLowerCase()}" class="statistic__filters-label">${name}</label>
  `);
  return statisticsStates.join(``);
};

const createStatsPageTemplate = (films) => {
  console.log(films);
  const statisticStates = createStatisticStatesTemplate();
  return `
  <section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      ${statisticStates}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Sci-Fi</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

class Stats extends SmartView {
  constructor(films) {
    super();
    this._films = films;
  }


  getTemplate() {
    return createStatsPageTemplate(this._films);
  }

  _setCharts() {
    // Нужно отрисовать два графика
  }
}

export default Stats;
