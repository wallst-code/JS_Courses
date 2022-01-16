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
