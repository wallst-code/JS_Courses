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
  const [newLanguage] = languagesArray;
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
  // countriesContainer.style.opacity = 1;
};
/*
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
**/

////////////// Fetch API and Promises ////////////////////////////
// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

/////// Fetch API - much easier

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   // countriesContainer.style.opacity = 1;
// };

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     // fetch(`https://restcountries.com/v3.1/name/${country}`)
//     //   .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour || neighbour === undefined)
//         throw new Error('No neighbour found');

//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     // .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🧨😡`);
//       renderError(`Something went wrong 💥💥💥 ${err.message} Try Again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

// getCountryData('australia');

//////////////////////// Coding Challenge #17 ///////////////////////////////
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json`)
//     .then(res => {
//       console.log(res);
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       // console.log(data.country);
//       console.log(`You are in ${data.city}, ${data.country}`);
//     });
//   // return fetch(`https://restcountries.com/v3.1/name/${country}`).catch(err =>
//   //   console.error(`${err.message} 💥`)
//   // );
// };
// whereAmI(52.508, 13.381);
// console.log('Test Start');
// setTimeout(() => console.log('0 second timer'), 0);
// Promise.resolve('resolved Promise 1').then(res => console.log(res));
// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 100000; i++) {}
//   console.log(res);
// });
// console.log('Test End');

//////////////////////////// Building a Simple Promise /////////////////////
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery Draw is beginning 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You Win 🤑');
    } else {
      reject(new Error('You Lose! 💲💩'));
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
