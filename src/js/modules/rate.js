import spoller from './spoiler.js'; // SPOILERS

const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en';
const list = document.querySelector('.rate__list');
let apexChart = null;

const delay = (ms = 0) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

async function getCoins() {
  const result = await (
    await fetch(url, {
      method: 'GET',
    })
  ).json();




  const coins = await Promise.all(
    result.map(async coin => {
      return await new Promise(resolve => {
        const item = document.createElement('li');
        item.classList.add('coin');
        item.onclick = selectCoin.bind(this, coin);

        const top = document.createElement('div');
        top.classList.add('coin__top');
        top.setAttribute('data-spoller', '');
        top.innerHTML = `
        <div class="coin__left">
        <div class="coin__img">
          <img src="${coin.image}" alt="" />
        </div>
        <div class="coin__title">
          <h5 class="coin__title-full">${coin.name}</h5>
          <h6 class="coin__title-short">${coin.symbol.toUpperCase()}</h6>
        </div>
      </div>

      <div class="coin__right">
        <span class="coin__price">$${coin.current_price}</span>
        <span class="coin__price-change"> <span>${coin.price_change_percentage_24h.toFixed(2)}%</span> <i class="coin__icon ${coin.price_change_percentage_24h <= 0 ? 'icon-double-arrow-down' : 'icon-double-arrow-up'}"></i></span>
      </div>
      `;

        item.appendChild(top);

        const bottom = document.createElement('div');
        bottom.classList.add('coin__bottom');

        item.appendChild(bottom);

        resolve(item);
      });
    }),
  );

  list.append(...coins);

  spoller();
}

getCoins();

async function selectCoin(coin) {
  const target = event.currentTarget;
  let chart = document.querySelector('#chart');

  if (target.querySelector('._active')) {
    apexChart.destroy();
    await delay(200);
    chart.remove();
    return;
  }

  const urlChart = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=1`;
  const res = (
    await (
      await fetch(urlChart, {
        method: 'GET',
      })
    ).json()
  ).prices;

  const data = [];
  for (let index = 0; index < res.length; index++) {
    if (!res[index + 1]) {
      break;
    }
    const first = res[index][1].toFixed(4);
    const last = res[index + 1][1].toFixed(4);
    data.push({
      x: res[index + 1][0],
      y: [first, first, last, last],
    });
  }

  chart = document.createElement('div');
  chart.id = 'chart';

  const bottom = target.querySelector('.coin__bottom');
  bottom.appendChild(chart);
  createChart(chart, data);
}

import ApexCharts from 'apexcharts';

function createChart(node, data) {
  const options = {
    series: [
      {
        data: data,
      },
    ],
    chart: {
      type: 'candlestick',
      toolbar: {
        autoSelected: 'zoom',
        show: false,
      },
    },
    theme: {
      mode: 'dark',
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: 'light',
        shadeIntensity: 0.65,
      },
    },
    xaxis: {
      type: 'datetime',
    },
  };

  apexChart = new ApexCharts(node, options);

  apexChart.render();
}
