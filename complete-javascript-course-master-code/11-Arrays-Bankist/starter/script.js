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
let currentAccount;

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

//Compute User Names
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

// Login
//Event Handler

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevent form from resubmitting na reloading
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('✔ LOGIN SUCCESS');
    //display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    //set .app opacity to 100%.
    containerApp.style.opacity = 100;
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    //removes cursor
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  } else {
    console.log('🛑 Login Failure');
  }
});

////// some() --- implement the loan funcitonality //////////////////////////////
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    console.log(`Loan Approved for ${amount}`);
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  } else {
    console.log(`Your loan for ${amount} was not approved.`);
    alert(`Your loan for $${amount} was not approved.`);
  }
  inputLoanAmount.value = '';
});

//////////////////////////// FIND INDEX METHOD ///////////////////////////
////// Event Handler - Close Account Implementation

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount?.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    inputCloseUsername.value = inputClosePin.value = '';

    // Delete Account
    accounts.splice(index, 1); // mutates so no need to save.

    // Hide UI
    containerApp.style.opacity = 0;
    console.log(`${currentAccount.username}'s account is now closed!`);

    // reload page to remove user name
    location.reload();
  }
});

//Display the movements or activity in the account.
//Later we added a 2nd parameter sort and set a default of false
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
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// state variable for the sort listener - we will use the !sorted to do the opposite of
// the state variable for sorting...
let sorted = false;
// Event Listener for Sorting Movements Display
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; //resets the sorted variable
});

//Display balance on page
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accum, mov) => accum + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((interest, i, array) => {
      return interest >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (currentAccount) {
  //display balance
  calcDisplayBalance(currentAccount);
  // display movements
  displayMovements(currentAccount.movements);
  // display summary
  calcDisplaySummary(currentAccount);
};

//Add Transfer Functioning
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
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
    receiverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);
  } else {
    alert('Invalid tranfer');
    console.log('Invalid tranfer');
  }
  console.log(amount, receiverAcc);
  console.log(currentAccount.movements);
});

// Implement Sorting Functionality
// We do not want to mutate the original array so we make a copy

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

////////////////// 3 Data Transformation Methods: MAP FILTER REDUCE //////////////////
/* 

Map creates a new array that is based upon the original array. Maps to a new array.

Filter - iterates the array to find elements that pass a condition and makes a new array based upon the filtered data. All other elements are filtered out and not in the new array. 

Reduce - reduces or boils all the array elements down to one single value (adding together). You need an accumulator and the element. The snowball effect. Get bigger when you roll it. No new array in this case. 

*/
//MAP

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUSD = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUSD;
// });

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDArrow = movements.map(mov => mov * euroToUSD);
// console.log('map() with arrow function ', movementsUSDArrow);

// const movementsUSDFor = [];
// for (const mov of movements) {
//   movementsUSDFor.push(mov * euroToUSD);
// }
// console.log(movementsUSDFor);

// const movementsDescriptions = movements.map(
//   (mov, i, arr) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited ' : 'withdrew '} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescriptions);

// //////////////// Filter Method ////////////////////////////////////////
// // Filter methods look for and satisfy for certain conditions;
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //Make an array of deposits
// const deposits = movements.filter(function (mov) {
//   return mov > 0; //boolean - only true will make it into the deposits array
// });

// console.log(movements, 'the original array of movements');
// console.log(
//   deposits,
//   'Here we separate out all the withdrawals and make an array of deposits'
// );

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor, 'Using a for of loop');

// //challenge make a withdrawals array

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals, 'Withdrawls array');

// //////////////// Reduce Method ///////////////////////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// // reduce parameters = accumulator - the snowball, the element -- current element, index, array ----- at the very end note that there is another parameter - it sets the starting value for the accumulator -- here it is 0.
// const balance = movements.reduce(function (accum, cur, i, array) {
//   console.log(`Iteriation ${i}: $${accum}`);
//   return accum + cur;
// }, 0);

// console.log(balance);

// // for loop example with reduce method vs for loop
// let sumBal = 0;
// for (const mov of movements) sumBal += mov;
// console.log('sumBal with for loop', sumBal);

// // Reduce method with an arrow function
// const balance2 = movements.reduce((accum, cur) => accum + cur, 0);
// console.log('with arrow funciton and reduce ', balance2);

//Maximum value of the movements array
// const maxValue = movements.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
// console.log(maxValue);

//////////////////// Chaining Methods ////////////////////////////
// const eurToUSD = 1.1;
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUSD)
//   .reduce((acc, mov) => acc + mov, 0); // You could not chain after reduce because it is a value - not an array. Think of it like a pipeline.

// // Performed 3 data transformation in one chain.
// // You can keep chaining as long as they return new arrays.
// // Chaining can make it harder to debug - the pipeline.

// console.log(totalDepositsUSD);
// console.log(Math.trunc(totalDepositsUSD));

/////////////////////// FIND METHOD /////////////////////////
// Needs a boolean condition like filter, but it does not return a new array
// It will return a value when or if it finds the first condition that is true.
// Unlike filter, the find() only returns the first condition that triggers true.
// The find() is usually set up to just find one element or condition.
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(`This is the first withdrawal amount: $${firstWithdrawal}`);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// Includes()
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// console.log(movements.includes(-130));

// Includes returns true if any value is equal to -130.
// But what if we want to test for a condition instead?

////////////////// Some() method /////////////////

// const anyDeposits = movements.some(mov => mov > 5000);
// console.log(anyDeposits);

/////////////////////// every() ////////////////////
// EVERY - only returns true if all of the elements in the array pass the condition.
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.every(mov => mov > 0));
// // false - so all of the movements are not deposits.
// console.log(account4.movements.every(mov => mov > 0));
// // true - all movements are positive - thus > 0 and are deposits

// // Separate callback
// const deposit = mov => mov > 0;
// const withdrawals = mov => mov < 0;

// console.log(movements.some(deposit), 'using a separate function callback');
// console.log(movements.every(deposit), 'using a separate function callback');

// console.log(movements.filter(deposit));

///////////////// FLAT
// compresses  or flattens all the values into one array from separate sub arrays.
// we call this flattening the array.
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

//Example bank wants to count all the movements of all accounts
// the movements are stored inside of arrays in the accounts objects.
// We need to take them out and put them all into one array.

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, cur) => acc + cur, 0);
// console.log(overallBalance);

// refactored using method chaining
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(overallBalance);

// // flatMap() ///////
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(overallBalance2, 'With flatMap()');

//////////////////// Sorting //////////////////////
// the builtin sort() mutates the original array.

// const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];
// console.log(owners, 'unsorted array');
// console.log(owners.sort(), 'sorted array');

// //the array has been mutated from the sort()
// console.log(owners, 'sorted array is now mutated');

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements, 'original array');

// // return < 0, A before B (keep order same)
// // return > 0, B before A (switch order)
// // this sort() loops over the array and puts it in ascending order
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// console.log(movements, 'ascending order');

// const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements2, 'original array');

// // descending order
// movements2.sort((a, b) => {
//   if (a < b) return 1;
//   if (b < a) return -1;
// });
// console.log(movements2, 'descending order');

// // ascending with strings in an array
// owners.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// console.log(owners);

// // descending with strings in an array
// owners.sort((a, b) => {
//   if (a < b) return 1;
//   if (b < a) return -1;
// });
// console.log(owners);

// // refactor to simplify
// const theseMoves = movements.sort((a, b) => a - b);
// console.log(theseMoves);

// const theseMoves2 = movements.sort((a, b) => b - a);
// console.log(theseMoves2);

// Mixed arrays with numbers and strings - the sort() will not work
// and there are other ways to do that.

//////////////// Creating and Filling Arrays /////////////////////

// Creates an array with 7 empty elements
const x = new Array(7);
console.log(x);

//The only method that can be used on this way is the fill()
// FILL - mutates the array

x.fill(1);
console.log(x);

const y = new Array(7);
console.log(y);

y.fill(1, 3, 5); //(filler, beg index, end index not inclusive)
console.log(y);

// Array.from()
const z = Array.from({ length: 7 }, () => 1);
console.log(z);

const z1 = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z1);

// Designed to create arrays from iterable array like structures...
// We can create arrays from other things...
// A node list is an array like structure (map()) will not work on a node list.

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});
