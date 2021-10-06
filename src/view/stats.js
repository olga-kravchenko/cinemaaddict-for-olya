import SmartView from "./smart";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderStatisticChart = (statisticCtx) => {
  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * 5;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
      datasets: [{
        data: [11, 8, 7, 4, 3],
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticStatesTemplate = () => {
  const stateNames = [`All time`, `Today`, `Week`, `Month`, `Year`];
  const statisticsStates = stateNames.map((name) => `
   <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${name.toLowerCase()}" value="${name.toLowerCase()}" ${name === `All time` ? `checked` : ``}>
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

    this._statisticCart = null;
    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._statisticCart !== null) {
      this._statisticCart = null;
    }
  }

  getTemplate() {
    return createStatsPageTemplate(this._films);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._statisticCart !== null) {
      this._statisticCart = null;
    }

    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._statisticCart = renderStatisticChart(statisticCtx);
  }
}

export default Stats;
