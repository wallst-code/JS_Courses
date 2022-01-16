'use strict';

//Default Parameters

const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', undefined, 800); // If skipping a parameter and can work with truth falsey.

// //How passing arguments works: value vs reference
// const flight = 'LH234';

// const jonas = {
//   name: 'Jonas Schmedtman',
//   passport: 2343452352354,
// };

// //The parameters are copies not pointing to the obj or variable.
// //When we pass a reference to a function we just copy the reference to the obj in the heap.
// //Both point to the same obj in the heap. They are the same obj in the memory heap.
// //So what we change in the copy will effect the original with objects.
// const checkIn = function (flightNum, passanger) {
//   flightNum = 'LH999';
//   passanger.name = 'Mr.' + passanger.name;

//   if (passanger.passport === 2343452352354) {
//     alert('check in');
//   } else {
//     alert('Wrong Passport Number');
//   }
// };
// // // checkIn(flight, jonas);
// // console.log(flight);
// // console.log(jonas);

// //example
// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 12155115151);
// };

// //Changes the number for both the original and the copy.
// newPassport(jonas);
// console.log(jonas);

// //But the passport has been changed and is now the wrong passport number.
// checkIn(flight, jonas);

//Functions that accept callback functions
// the / / flag replaces the ' ' and the g flag means global - it takes out all spaces and replaces with an empty string.
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWords = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//since this takes in a funciton as a parameter - this is a higher order function.
const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

//The second parameter here is the callback function.
transformer('JavaScript is the best!', upperFirstWords);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time.
const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

// //Functions returning functions
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name} regular function\n\n`);
//   };
// };

// //My challenge to do the arrow function.
// const greet1 = greeting => {
//   return name => console.log(`${greeting} ${name} my first arrow function\n\n`);
// };

// //Simplified Solution Arrow Function - one line.
// //Arrow function returning an arrow function.
// const greetArr = greeting => name =>
//   console.log(`${greeting} ${name} with the arrow function\n\n`);

// const greeterHey = greet('Hey');
// greeterHey('Jonas****');
// greeterHey('Senit');

// const greetNew = greet1('Hello');
// greetNew('Senit');
// greetNew('Jonas');

// const greetNew2 = greetArr('Hello');
// greetNew2('Senit');
// greetNew2('Jonas');

// /*Passing parameters to function that returns a function...the first(param)
// is the higher function param, and the second (param) is the inner function*/
// greet('Hello')('Senit');
// greet("How Y'all do'n")('*****Senit****\n');

// greet1('Hello')('Senit');
// greetArr('Hello')('Senit');
