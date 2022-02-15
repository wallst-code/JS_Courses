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
// console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {} (execution context)
// 3. {} is linked to a prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

// const jay = 'Jay';
// console.log(jonas instanceof Person);
// console.log(jay instanceof Person);

//////////////// Prototypes ////////////////////
console.log(Person.prototype);

// this provides prototypal inheritance to methods to the instances vs a copy for each.
// SETTING METHODS ON THE PROTOTYPE
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
console.log(jonas);

// const jenny = new Person('Jenny', 1971);
// jenny.calcAge();

console.log(jonas.__proto__);
//obj.__proto__ is a special property that each prototype has.
//it shows the attributes and methods available.
console.log(jonas.__proto__ === Person.prototype);
//true
// Note the Person.prototype is the prototype that will be used on all instances
// with the constructor function - it is not the class itself.
// It is not the prototype of Person, but rather of linked objects.
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));

// SETTING PROPERTIES ON THE PROTOTYPE
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

jonas.species = 'Homo No Mo';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'), 'instance variable');
console.log(jonas.hasOwnProperty('species'), 'has own prop', jonas.species);
console.log(matilda.hasOwnProperty('species'), 'has own prop', matilda.species);
console.log(jonas);

//////////////// PROTOTYPAL INHERITANCE AND THE PROTOTYPE CHAIN //////////////
// See notes
//////////////// PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS //////////////
// Move up the prototype chain using 2x .__prototype__
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

// console.dir
console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [3, 6, 7, 8, 9, 9, 6, 7, 10]; // new Array === [] is created by the array constructor.
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__); // The prototype itself is an object and thus has access to all of these methods.
console.log(arr.__proto__.__proto__.__proto__);

// Here we add a new function to the prototype constructor. Now all arrays will inherit this method.
// However, adding a method to inherit is not a good idea on a built-in prototype.
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());
//[3,6,7,8,9,10]

const h1 = document.querySelector('h1');
console.log(h1);
console.dir(h1);
