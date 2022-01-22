'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data - 4 account objects - data from an API usually comes as objects.
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//Arrays are objects and have builtin methods.

// let arr = ['a', 'b', 'c', 'd', 'e'];

// //Array Methods
// //Slice does not mutate - it just creates a new array wit hthe extracted parts.
// // Note the end number is not included, but the starting number is.
// // Calculate the last index number that will be included by subtracting the start from the end = index.
// // Example: 1 - 4 = 3, and so we would get up to index 3. In this case that would be 'd'.
// // Copying from the end of an array by starting with a negative number -- with (-2) you would get the last two elements in the array.
// // -1 is the last element of any array. Using (1, -2) would start with the [1] index position and the -2 would not be included - the end points are not included.
// console.log(arr.slice(2));
// // c, d, e
// console.log(arr.slice(1, 4));
// // b, c, d
// console.log(arr.slice(-2));
// // d, e
// console.log(arr.slice(1, -2));
// // b, c
// console.log(arr.slice());
// // no parameters creates a shallow copy of the entire array.
// console.log([...arr]);
// // This creates a new array and uses the spread operator to expand the original array - same as the sopy.
// // You can use slice() or ...the spread operator, but the slice() will allow you to chain methods.

// // The SPLICE Method - this one does mutate the original array.

// console.log(arr.splice(2));
// // c, d, e
// console.log(arr);
// // But the original array has been mutated to a, b. The extracted elements are removed.
// // Common Use Case - remove the last element from an array.
// console.log(arr.splice(-1));
// // b --- because we already mutated the array above.

// let arr2 = ['a', 'b', 'c', 'd', 'e'];
// // Use Splice to remove two inner elements: Here the ending number is included.
// console.log(arr2.splice(1, 2));
// // b, c
// console.log(arr2);
// // [a, b, e]

// //REVERSE - reverses the order and mutates the original array
// let arr3 = ['e', 'd', 'c', 'b', 'a'];
// console.log(arr3, 'original array');
// console.log(arr3.reverse(), 'reversed array');
// console.log(arr3, 'Reverse mutates the original array');

// // CONCAT - concatenates arrays - makes a new array and Does not Mutate the Original
// //Choice of methods - does not matter except for chaining methods.
// const letters = arr2.concat(arr3);
// console.log(letters, 'Concatenated arrays 2 & 3');
// // Alternative method - use multiple spread operators:
// console.log([...arr, ...arr2, ...arr3], 'Using spread operators');

// // JOIN Method - does not mutate the original array
// console.log(letters.join(' - '), 'Using Join');
// // a - b - c - d - e ....
// console.log(letters, 'join does not mutate');
// ////////////////////////////////////////////////////////////////
// //ES 2022 At Method - returns a value of an array at a specified index position.
// //replaces [] with a method ().
// // Why care? .at() is better for using the end of an array and if you want to method chain the .at() is better.
// //The .at() also works on strings.
// const array1 = [23, 11, 12, 15];
// console.log(array1, 'original array');
// console.log(array1.at(0), 'using the .at(0) to find the value of an index');
// console.log('give the same result as array1[0]', array1[0]);

// console.log(
//   array1[array1.length - 1],
//   ' if we wanted to get the last value the old way array1[array1.length - 1]'
// );
// console.log(array1.at(-1), 'with the .at(-1)'); //you could also do this with slice.

// //Using .at() on a string:
// console.log('Senit'.at(-1), '.at() can be used on strings');

//////////////////////////////////////////////////////////////
//Looping Arrays
// For Each Loop with an Array

// console.log('------------- FOR OF ------------');
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movements > 0) {
//     console.log(`You deposited $${movement}`);
//   } else {
//     console.log(`You withdrew $${Math.abs(movement)}`);
//   }
// }

// console.log('------------- FOR OF with index------------');
// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(` ${i}: You deposited $${movement}`);
//   } else {
//     console.log(`${i}: You withdrew $${Math.abs(movement)}`);
//   }
// }

// console.log('------------- FOR EACH =>  ------------');

// movements.forEach(element => {
//   element > 0
//     ? console.log(`You deposited $${element}`)
//     : console.log(`You withdrew $${Math.abs(element)}`);
// });

// console.log('------------- FOR EACH with Function() ------------');
// movements.forEach(function (movement) {
//   movement > 0
//     ? console.log(`You deposited $${movement}`)
//     : console.log(`You withdrew $${Math.abs(movement)}`);
// });

// console.log(
//   '------------- FOR EACH with Function() with index info ------------'
// );
// // Order of the parameters matters here: parameter one the element, paramter 2 - the index position, and last entire array that we are looping.
// movements.forEach(function (movement, index, array) {
//   movement > 0
//     ? console.log(`${index}: You deposited $${movement}`)
//     : console.log(`${index}: You withdrew $${Math.abs(movement)}`);
//   console.log(`${array}`);
// });
// console.log(
//   '----------- FOR EACH with Function() with index info no array ---------'
// );
// movements.forEach(function (movement, index) {
//   movement > 0
//     ? console.log(`${index}: You deposited $${movement}`)
//     : console.log(`${index}: You withdrew $${Math.abs(movement)}`);
// });

//Notes - the parameters in the forEach and the For of with .entries() loops are different.
// forEach(function(element of arr, index, entire array being iterated)).
// for (const [index, element] of <array>.enteries())
// WHEN should you use each one?
// you cannot break out of a forEach loop - entire loop must run. Otherwise, it is preferrence.

////////////////////////////////////////////////////////////
////////////// forEach with sets and maps
// console.log('**************** forEach Loops with Maps and Sets');
// //Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]); //key values

// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });

// //Set - sets only contain unique values - duplicates will not be produced.
// const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'USD', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`${value} : ${value}`);
// });
//A set does not have keys or indexes - so it only has values.
//But the same signature is used to avoid confusion between using on sets and maps.
//NOTE - in JS the "_" in the parameter is just a throw away - place holder.
