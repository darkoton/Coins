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
  // const result = await (
  //   await fetch(url, {
  //     method: 'GET',
  //   })
  // ).json();

  const result = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 43203,
      market_cap: 846646612963,
      market_cap_rank: 1,
      fully_diluted_valuation: 906419312278,
      total_volume: 25105437791,
      high_24h: 43250,
      low_24h: 41883,
      price_change_24h: -34.00099437958124,
      price_change_percentage_24h: -0.07864,
      market_cap_change_24h: -3113994589.956421,
      market_cap_change_percentage_24h: -0.36646,
      circulating_supply: 19615181.0,
      total_supply: 21000000.0,
      max_supply: 21000000.0,
      ath: 69045,
      ath_change_percentage: -37.48417,
      ath_date: '2021-11-10T14:24:11.849Z',
      atl: 67.81,
      atl_change_percentage: 63555.13424,
      atl_date: '2013-07-06T00:00:00.000Z',
      roi: null,
      last_updated: '2024-02-01T20:01:27.431Z',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 2304.42,
      market_cap: 276741309706,
      market_cap_rank: 2,
      fully_diluted_valuation: 276741309706,
      total_volume: 10859709916,
      high_24h: 2316.3,
      low_24h: 2246.98,
      price_change_24h: -11.883556563666389,
      price_change_percentage_24h: -0.51304,
      market_cap_change_24h: -2494279705.0422363,
      market_cap_change_percentage_24h: -0.89325,
      circulating_supply: 120182539.297871,
      total_supply: 120182539.297871,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -52.79709,
      ath_date: '2021-11-10T14:24:19.604Z',
      atl: 0.432979,
      atl_change_percentage: 531722.98896,
      atl_date: '2015-10-20T00:00:00.000Z',
      roi: {
        times: 70.28865090928132,
        currency: 'btc',
        percentage: 7028.865090928132,
      },
      last_updated: '2024-02-01T20:01:38.512Z',
    },
    {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.999296,
      market_cap: 96399017529,
      market_cap_rank: 3,
      fully_diluted_valuation: 96399017529,
      total_volume: 34979630633,
      high_24h: 1.002,
      low_24h: 0.99485,
      price_change_24h: -0.000771795245203877,
      price_change_percentage_24h: -0.07717,
      market_cap_change_24h: 181136298,
      market_cap_change_percentage_24h: 0.18826,
      circulating_supply: 96219281549.494,
      total_supply: 96219281549.494,
      max_supply: null,
      ath: 1.32,
      ath_change_percentage: -24.33641,
      ath_date: '2018-07-24T00:00:00.000Z',
      atl: 0.572521,
      atl_change_percentage: 74.85846,
      atl_date: '2015-03-02T00:00:00.000Z',
      roi: null,
      last_updated: '2024-02-01T20:00:12.859Z',
    },
    {
      id: 'binancecoin',
      symbol: 'bnb',
      name: 'BNB',
      image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970',
      current_price: 301.14,
      market_cap: 46270577423,
      market_cap_rank: 4,
      fully_diluted_valuation: 46270577423,
      total_volume: 664852492,
      high_24h: 304.21,
      low_24h: 296.94,
      price_change_24h: -3.0616761204520344,
      price_change_percentage_24h: -1.00645,
      market_cap_change_24h: -631581938.7011871,
      market_cap_change_percentage_24h: -1.34659,
      circulating_supply: 153856150.0,
      total_supply: 153856150.0,
      max_supply: 200000000.0,
      ath: 686.31,
      ath_change_percentage: -56.18005,
      ath_date: '2021-05-10T07:24:17.097Z',
      atl: 0.0398177,
      atl_change_percentage: 755190.32053,
      atl_date: '2017-10-19T00:00:00.000Z',
      roi: null,
      last_updated: '2024-02-01T20:01:36.412Z',
    },
    {
      id: 'solana',
      symbol: 'sol',
      name: 'Solana',
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756',
      current_price: 97.8,
      market_cap: 42594946273,
      market_cap_rank: 5,
      fully_diluted_valuation: 55547203812,
      total_volume: 3447662497,
      high_24h: 100.55,
      low_24h: 93.46,
      price_change_24h: -2.751065623261013,
      price_change_percentage_24h: -2.73609,
      market_cap_change_24h: -1327792783.243309,
      market_cap_change_percentage_24h: -3.02302,
      circulating_supply: 435977835.993752,
      total_supply: 568549835.90066,
      max_supply: null,
      ath: 259.96,
      ath_change_percentage: -62.64809,
      ath_date: '2021-11-06T21:54:35.825Z',
      atl: 0.500801,
      atl_change_percentage: 19288.88049,
      atl_date: '2020-05-11T19:35:23.449Z',
      roi: null,
      last_updated: '2024-02-01T20:01:29.470Z',
    },
    {
      id: 'ripple',
      symbol: 'xrp',
      name: 'XRP',
      image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442',
      current_price: 0.509623,
      market_cap: 27734572469,
      market_cap_rank: 7,
      fully_diluted_valuation: 51000424663,
      total_volume: 1043011496,
      high_24h: 0.510475,
      low_24h: 0.490727,
      price_change_24h: -0.000236325225811296,
      price_change_percentage_24h: -0.04635,
      market_cap_change_24h: -51579873.201187134,
      market_cap_change_percentage_24h: -0.18563,
      circulating_supply: 54374512255.0,
      total_supply: 99987956150.0,
      max_supply: 100000000000.0,
      ath: 3.4,
      ath_change_percentage: -85.01473,
      ath_date: '2018-01-07T00:00:00.000Z',
      atl: 0.00268621,
      atl_change_percentage: 18858.58653,
      atl_date: '2014-05-22T00:00:00.000Z',
      roi: null,
      last_updated: '2024-02-01T20:01:37.736Z',
    },
    {
      id: 'usd-coin',
      symbol: 'usdc',
      name: 'USDC',
      image: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694',
      current_price: 1.001,
      market_cap: 26824149700,
      market_cap_rank: 6,
      fully_diluted_valuation: 25543789011,
      total_volume: 6113239013,
      high_24h: 1.003,
      low_24h: 0.994008,
      price_change_24h: 0.00252962,
      price_change_percentage_24h: 0.25336,
      market_cap_change_24h: 3761001,
      market_cap_change_percentage_24h: 0.01402,
      circulating_supply: 26747487458.3254,
      total_supply: 25470785983.8999,
      max_supply: null,
      ath: 1.17,
      ath_change_percentage: -14.73349,
      ath_date: '2019-05-08T00:40:28.300Z',
      atl: 0.877647,
      atl_change_percentage: 13.9326,
      atl_date: '2023-03-11T08:02:13.981Z',
      roi: null,
      last_updated: '2024-02-01T20:01:37.937Z',
    },
    {
      id: 'staked-ether',
      symbol: 'steth',
      name: 'Lido Staked Ether',
      image: 'https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206',
      current_price: 2307.08,
      market_cap: 21775548421,
      market_cap_rank: 8,
      fully_diluted_valuation: 21783784589,
      total_volume: 25687026,
      high_24h: 2314.87,
      low_24h: 2245.64,
      price_change_24h: -7.7916758275450775,
      price_change_percentage_24h: -0.33659,
      market_cap_change_24h: -67126527.0508461,
      market_cap_change_percentage_24h: -0.30732,
      circulating_supply: 9439858.27713896,
      total_supply: 9443428.71573486,
      max_supply: null,
      ath: 4829.57,
      ath_change_percentage: -52.42011,
      ath_date: '2021-11-10T14:40:47.256Z',
      atl: 482.9,
      atl_change_percentage: 375.85888,
      atl_date: '2020-12-22T04:08:21.854Z',
      roi: null,
      last_updated: '2024-02-01T20:01:46.985Z',
    },
    {
      id: 'cardano',
      symbol: 'ada',
      name: 'Cardano',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090',
      current_price: 0.499394,
      market_cap: 17518325416,
      market_cap_rank: 9,
      fully_diluted_valuation: 22459187871,
      total_volume: 400592058,
      high_24h: 0.510845,
      low_24h: 0.486969,
      price_change_24h: -0.011450850930825984,
      price_change_percentage_24h: -2.24155,
      market_cap_change_24h: -460381749.2458916,
      market_cap_change_percentage_24h: -2.56071,
      circulating_supply: 35100318330.6778,
      total_supply: 45000000000.0,
      max_supply: 45000000000.0,
      ath: 3.09,
      ath_change_percentage: -83.83258,
      ath_date: '2021-09-02T06:00:10.474Z',
      atl: 0.01925275,
      atl_change_percentage: 2492.2221,
      atl_date: '2020-03-13T02:22:55.044Z',
      roi: null,
      last_updated: '2024-02-01T20:01:37.562Z',
    },
    {
      id: 'avalanche-2',
      symbol: 'avax',
      name: 'Avalanche',
      image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369',
      current_price: 33.72,
      market_cap: 12370894290,
      market_cap_rank: 10,
      fully_diluted_valuation: 14663521841,
      total_volume: 572892546,
      high_24h: 35.12,
      low_24h: 32.4,
      price_change_24h: -1.3473441970032098,
      price_change_percentage_24h: -3.84204,
      market_cap_change_24h: -535012686.2227745,
      market_cap_change_percentage_24h: -4.14549,
      circulating_supply: 367101689.49217,
      total_supply: 435134559.852064,
      max_supply: 720000000.0,
      ath: 144.96,
      ath_change_percentage: -76.90939,
      ath_date: '2021-11-21T14:18:56.538Z',
      atl: 2.8,
      atl_change_percentage: 1094.98944,
      atl_date: '2020-12-31T13:15:21.540Z',
      roi: null,
      last_updated: '2024-02-01T20:01:28.600Z',
    },
    {
      id: 'dogecoin',
      symbol: 'doge',
      name: 'Dogecoin',
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409',
      current_price: 0.079695,
      market_cap: 11382868201,
      market_cap_rank: 11,
      fully_diluted_valuation: 11382855455,
      total_volume: 325926572,
      high_24h: 0.079989,
      low_24h: 0.077836,
      price_change_24h: 0.00000297,
      price_change_percentage_24h: 0.00372,
      market_cap_change_24h: -25185135.523248672,
      market_cap_change_percentage_24h: -0.22077,
      circulating_supply: 142896996383.705,
      total_supply: 142896836383.705,
      max_supply: null,
      ath: 0.731578,
      ath_change_percentage: -89.11205,
      ath_date: '2021-05-08T05:08:23.458Z',
      atl: 0.0000869,
      atl_change_percentage: 91557.53718,
      atl_date: '2015-05-06T00:00:00.000Z',
      roi: null,
      last_updated: '2024-02-01T20:01:42.333Z',
    },
  ];

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
