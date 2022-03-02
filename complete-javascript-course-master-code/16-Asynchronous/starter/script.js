'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// use this URL    https://restcountries.com/v3.1/
///////////////////////////////////////

// There are many ways to call APIs.
// Old School API Call Method - HTTP XML Function

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const languagesArray = Object.values(data.languages);
    const currenciesArray = Object.values(data.currencies);
    console.log(languagesArray[0]);
    console.log(currenciesArray);
    console.log(Object.entries(data.currencies));

    const html = `<article class="country">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} Million</p>
          <p class="country__row"><span>🗣️</span>${languagesArray[0]}</p>
          <p class="country__row"><span>💰</span>${currenciesArray[0].symbol} ${
      currenciesArray[0].name
    }</p>

        </div>
      </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('germany');
getCountryData('usa');
