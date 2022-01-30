'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    // Number(inputClosePin.value) === currentAccount.pin
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// numbers are always seen as flotating point numbers in JS.
// console.log(23 === 23.0);
// // true

// // Base 10: 0-9
// // Binary 2: 0-1
// // fractions are harder to represent in JS because of this - we get an infinite fraction.
// console.log(0.1 + 0.2);
// // 0.3000000000000000000004

// console.log(0.1 + 0.2 === 0.3);
// // false - we just have to accept this in JS.

// // YOU  CANNOT DO PRECISE FINANCIAL CALCULATIONS WITH JS BECAUSE OF THIS

// // converts string to number
// console.log(Number('23'));

// // a trick that gets JS to convert to number.
// console.log(+'23');

// // PARSING
// // Turned the string into a number - the string must start with a number - and it will return the number from the str.
// // the 10 that is passed in helps avoid bugs becaue it tells JS that we are using base 10.
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('30.5px', 10)); //must use parseFloat for this.
// console.log(Number.parseInt('e30', 10)); // this produces NaN - it must start with a number not text.

// // to deal with decimals and floating point numbers. ** Use this for CSS elements.
// console.log(Number.parseFloat('2.5rem'));

// // To check to see if the parameter is NaN returns true if it is and false if it is a number.
// console.log(Number.isNaN(20));
// console.log(Number.isNaN(+'20'));
// console.log(Number.isNaN(23 / 0));

// // isFinite is better for checking for zero division and whether the value is a real number vs a string.
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(23 / 0)); //this gives us infinity that is not finite.
// console.log(Number.isFinite(20.5));

// // to check for a value if it is an interger. Note that the float point will fail.
// console.log(Number.isInteger(20));
// console.log(Number.isInteger(20.5));

// ///////////////////////// Math ////////////////////////////////

// console.log(Math.sqrt(25));

// // Here we take 25 exponent .5 this is the square root basicially
// console.log(25 ** (1 / 2));
// console.log(25 ** 0.5);

// //cubic root
// console.log(8 ** (1 / 3));

// //max value will perform type coersion but not parsing.
// console.log(Math.max(3, 7, 9));
// console.log(Math.max(3, '9', 2));

// //min value
// console.log(Math.min(1, -3, 45, 78, 9));

// // PI constant
// console.log(Math.PI);
// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// //Random()
// console.log(Math.random() * 6);
// // here we use trunc() to cut off the decimals, we x6 to get the right range of random numbers
// // we add 1 to eliminate the result of zero that we would get because we trunc() so
// //when a number was less than 1 we would get 0 rather than 0.009845...
// // makes the results 1 to 6
// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (max, min) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;
// console.log('randomInt', randomInt(10, 20));

// // Rounding Int
// //trunc() removes any decimal part
// console.log(Math.trunc(23.3), 'trunc(23.3)');

// console.log(Math.round(23.3), 'round(23.3)');
// console.log(Math.round(23.9), 'round(23.9)');

// //ceil = ceiling
// console.log(Math.ceil(23.3), 'ceil(23.3)');
// console.log(Math.ceil(23.9), 'ceil(23.9)');

// //floor
// console.log(Math.floor(23.9), 'floor(23.3)');
// console.log(Math.floor(23.9), 'floor(23.9)');

// //with negative numbers this will work the otherway around.

// //Decimals - a bit different - need number and then toFixed()
// // ******* toFixed() returns a string not a number.
// console.log((2.7).toFixed(0), 'toFixed(0) 2.7');
// console.log((2.3).toFixed(0), 'toFixed(0) 2.3');

// console.log((2.3).toFixed(1), 'toFixed(1) 2.3');
// console.log((2.7).toFixed(1), 'toFixed(1) 2.7');
// console.log((2.35555).toFixed(2), 'toFixed(2) 2.35555');
// console.log((2.75555).toFixed(2), 'toFixed(2) 2.75555');
// // to coerce this into a number from a string add a +
// console.log(+(2.75555).toFixed(3), 'toFixed(3) 2.75555');
// console.log(+(2.755).toFixed(2), 'toFixed(2) 2.755');

// /////////////////// Remainder Operator /////////////////
// console.log(5 % 2, '5%2 modulus');
// // 1 because 5/2 = 1 remainder (2+2 =4 with 1 remaining)
// // The remainder asks how many times a number can be subtracted as a whole without any fractions.

// //Division asks how many times can a number be subtracted from another number
// console.log(5 / 2, '5/2 division');
// // 2.5

// //A number is even if we can divide by 2 with a remainder of 0.
// console.log(6 % 2); // = 0
// console.log(7 % 2); // = 1 meaning it has a remainder of 1.

// const isEven = n => n % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(11));

// //used the spread operator to change the background color of each even row.
// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     // 0,2,4,6 rows
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     //rows = 0,3,5,9
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

// ///////////Numeric Separators ////////////////
// ////only use them in the code to make it readable - it does not do anything else.
// const diameter = 287_460_000_000; //this is hard to read like this. 287,460,000,000
// console.log(diameter);

// const price = 345_99; //the underscore helps make the number easier to read. Only placed between numbers.
// console.log(price);

// const transferFee = 15_00;
// console.log(transferFee);

// console.log(Number('23000'));

// /////////////// BigInt ///////////////////
// // numbers are repesented 64 bits (1 and 0) only 53 are used for digits the rest are for signs and other.
// console.log(2 ** 53 - 1); //9007199254740991 the biggest number that can be represented with 53 bits.
// console.log(Number.MAX_SAFE_INTEGER); //same answer

// console.log(BigInt(4838430254544894884889878978787878789787454545554545545)); //using the function - no need for "n" at the end.
// console.log(4838430254544894884889878978787878789787454545554545545n); //without the funciton
// //But notice that the results will be differnt. The contructor method should be used only with smaller numbers.
// console.log(BigInt(2343434));
// console.log(2343434n);

// //cannot mix BigInt with regular numbers.

// const huge = 23423452342342342342342423n;
// const num = 23;

// //How you must handle mixing BigInt with reg nums.
// console.log(huge * BigInt(num));
// // exceptions to this - logical operators and string concatenations
// console.log(huge > num);
// console.log(20n === 20); // this will not work
// console.log(typeof 20n);
// console.log(typeof 20);
// console.log(20n == 20); // this will return true

// console.log(huge + 'is really big num');

// const strNum = huge + 'is a really big num';

// console.log(typeof strNum);

///////////// Dates //////////////////////////////
// Create a Date 4 ways to do this - all use the new date constructor funciton
//with different parameters

// const now = new Date();
// console.log(now);

// //Parse the date from a date string
// console.log(new Date('Aug 02,2020 18:05:12'));
// console.log(new Date('December 24, 2015'));

// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5));

// //You can pass into as a parameter the number of milliseconds since Jan 1, 1970
// console.log(new Date(0, 0)); // milliseconds after this time

// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // = 3rd day time stamp
// console.log(new Date(0, 3 * 24 * 60 * 60 * 1000));
// console.log(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));

//Working with dates - gives a time stamp
//
//////////////////////// Add dates to the Bankist App ////////////////////
