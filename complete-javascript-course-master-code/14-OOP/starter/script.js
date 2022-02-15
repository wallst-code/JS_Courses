'use strict';

// Constructor Function -- it is called with the new operator
// Constructor Functions capitalize the first letters as a rule.
// Arrow functions will not work with constructor functions

const Person = function (firstName, birthYear) {
  //instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  console.log(this);

  // adding methods
  // ************** NEVER CREATE A METHOD IN A CONSTRUCTOR FUNCTION ***********************//
  // This creates poor performance
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {} (execution context)
// 3. {} is linked to a prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

const jay = 'Jay';
console.log(jonas instanceof Person);
console.log(jay instanceof Person);
