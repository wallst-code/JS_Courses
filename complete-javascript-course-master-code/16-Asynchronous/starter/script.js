'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// use this URL    https://restcountries.com/v3.1/
///////////////////////////////////////

// There are many ways to call APIs.
// Old School API Call Method - HTTP XML Function

const renderCountry = function (data, className = '') {
  const languagesArray = Object.values(data.languages);
  const currenciesArray = Object.values(data.currencies);
  const html = `
  <article class="country ${className}">
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
  }
  </p></div>       
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryDataAndNeighbor = function (country) {
  // AJAX call Country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // Event Listener
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render Country 1
    renderCountry(data);

    // Get Neighbor Country
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // 2nd AJAX Call
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryDataAndNeighbor('usa');
