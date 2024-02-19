const fac = new FastAverageColor();

class Select {
  constructor(options) {
    this.element = document.querySelector(options.element);
    this.values = options.values;
    this.placeholde = options.placeholde;
    this.value = null;
    this.label = null;

    this.imgEl = null;
    this.textEl = null;

    if (!this.element) {
      throw 'Element not defined';
    }

    this.element.classList.add('pa-select');

    if (this.values && !Array.isArray(this.values)) {
      throw 'Values must be typeof array';
    }
  }

  select(callback = () => { }) {
    this.selectCallback = callback;
  }
  scollLoad(callback = () => { }) {
    this.scrollLoadCallback = callback;
  }
  start(callback = () => { }) {
    this.startCallback = callback;
  }

  onSelect(label, value) {
    this.value = value;
    this.label = value.name;

    this.imgEl.src = value.image;
    this.textEl.textContent = value.name;
    this.element.classList.remove('active')


    this.selectCallback ? this.selectCallback(value, this) : null;
  }

  render() {
    const field = document.createElement('div');
    field.classList.add('pa-select-field');

    const valueImg = document.createElement('img');
    valueImg.src = this.value ? this.value.img : this.values && this.values.length ? this.values[0].image : '';
    this.imgEl = valueImg;
    valueImg.classList.add('pa-select-value-img');

    const icon = document.createElement('i');
    icon.classList.add('pa-select-icon-arrow');
    icon.classList.add('icon-arrow-down');

    const valueText = document.createElement('span');
    valueText.textContent = this.label ? this.label : this.values && this.values.length ? this.values[0].name : this.placeholder ? this.placeholder : '';
    this.textEl = valueText;
    valueText.classList.add('pa-select-value-text');

    const valueSpan = document.createElement('span');

    const selectList = document.createElement('ul');
    selectList.classList.add('pa-select-list');

    selectList.addEventListener('scroll', event => {
      if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 100) {
        this.scrollLoadCallback ? this.scrollLoadCallback(event) : null;
      }
    });

    if (this.values) {
      this.values.forEach(value => {
        const item = document.createElement('li');
        item.classList.add('pa-select-item');
        item.selectValue = value.id;
        item.onclick = this.onSelect.bind(this, value.name, value);

        const img = document.createElement('img');
        img.classList.add('pa-select-item-img');
        img.src = value.image;

        const text = document.createElement('span');
        text.classList.add('pa-select-item-text');
        text.textContent = value.name;

        item.append(img, text);
        selectList.appendChild(item);
      });
    }

    valueSpan.classList.add('pa-select-value');
    valueSpan.onclick = () => {
      this.element.classList.toggle('active');
    };
    valueSpan.append(valueImg, valueText, icon);

    field.append(valueSpan, selectList);
    this.element.appendChild(field);
    this.startCallback ? this.startCallback(this) : null;
  }

  init() {
    this.render();
  }
}

let coins = [];
async function getCoins() {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en`;

  const result = await (
    await fetch(url, {
      method: 'GET',
    })
  ).json();

  coins = result;
}
function selectHandle(value, selectOp) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', value.image, true);
  xhr.responseType = 'blob';
  xhr.onload = async function () {
    if (xhr.status === 200) {
      facBg(xhr.response, selectOp);
    }
  };

  xhr.send();
}

function startHandle(selectOp) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', selectOp.imgEl.src, true);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    if (xhr.status === 200) {
      facBg(xhr.response, selectOp);
    }
  };

  xhr.send();
}

async function facBg(blob, selectOp) {
  let blobUrl = URL.createObjectURL(blob);

  const color = await fac.getColorAsync(blobUrl);
  selectOp.element.offsetParent.style.backgroundColor = color.rgba;
  selectOp.element.offsetParent.style.color = color.isDark ? '#fff' : '#000';
  selectOp.element.offsetParent.querySelector('input').style.borderColor = color.isDark ? '#fff' : '#000';
}

async function createSelect() {
  await getCoins();

  const select = new Select({
    element: '#select',
    values: coins,
  });
  select.select(selectHandle);
  select.start(startHandle);
  select.init();

  const select2 = new Select({
    element: '#select2',
    values: coins,
  });
  select2.select(selectHandle);
  select2.start(startHandle);
  select2.init();
}


document.querySelector('.convertor__icon').addEventListener('click', reverseItems)

function reverseItems(event) {
  console.log(event);
  event.target.classList.toggle('rotate');

  if (document.querySelector('.convertor__items').classList.contains('reverse')) {
    document.querySelector('.convertor__items').classList.remove('reverse');
    document.querySelector('.convertor__items').classList.add('normal');
  } else {
    document.querySelector('.convertor__items').classList.add('reverse');
    document.querySelector('.convertor__items').classList.remove('normal');
  }

}

createSelect();



