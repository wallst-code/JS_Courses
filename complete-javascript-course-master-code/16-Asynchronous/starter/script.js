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
  countriesContainer.style.opacity = 1;
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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

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
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery Draw is beginning 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You Win 🤑');
//     } else {
//       reject(new Error('You Lose! 💲💩'));
//     }
//   }, 2000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// ///////////////// Promisifying setTimeout ///////////////////
// const wait = function (seconds) {
//   return new Promise(function (resolve, reject) {
//     //we do not need reject with the setTimeout because it cannot fail.
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// Promise.resolve('resolved value is passed in here').then(x => console.log(x));
// Promise.reject(new Error('Problem! 💥')).catch(x => console.error(x));
///////////////////// Promisifying the Geolocation API ////////////////////////////

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(
//       position => resolve(position),
//       err => reject(err)
//     );
//   });
// };

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition()
//   .then(pos => console.log(pos))
//   .catch(err => console.log(err));

// const whereAmI = function () {};

//////////////////// Consuming Promises with Async/Await //////////////////
////////////// An even better way to consume promises -- async functions ////////////////////

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   // geolocation
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('Problem getting location data.');
//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);

//     // country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error('Problem getting location data.');
//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);
//   } catch (err) {
//     console.error(`${err}`);
//     renderError(`Something went wrong 💥 ${err.message}`);
//   }
// };
// whereAmI();
// console.log('This should be 1st');

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

////////////////////// Returning values from Async Functions /////////////////////////

// (async function () {
//   try {
//     let y = 1;
//     const x = 2;
//     x = 3;
//     console.log(y);
//   } catch (err) {
//     console.log('problem 1');
//   } finally {
//     console.log('done');
//   }
// })();

/////////////////////////// Running Promises in Parallel //////////////////////////

///////////////////// Promise Combinators ////////////////////

Promise.any([
  Promise.resolve('Success 1'),
  Promise.reject('Reject'),
  Promise.resolve('Success 2'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

///////////// Coding Challenge #3 /////////////////
