'use strict';

// function calcAge(birthYear) {
//   const age = 2022 - birthYear;

//   function printAge() {
//     const output = `${firstName} is ${age}, born in ${birthYear}.`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1986) {
//       const str = `Oh, and you are a millenial, ${firstName}.`;
//       console.log(str);
//       //   var millenial = true;

//       function add(a, b) {
//         return a + b;
//       }
//       console.log(add(2, 2));
//     } else {
//       const str = `${firstName}, you're not a millenial.`;
//       console.log(str);
//     }
//     // console.log(millenial);
//     // console.log(add(2, 3));
//   }

//   printAge();

//   return age;
// }

// const firstName = 'Senit';
// calcAge(1985);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
// calcAgeArrow(1980);

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function (year) {
//     console.log(2037 - this.year);
//     console.log(this);

//     //Solution 1 - old way
//     // const self = this; //can be called self or that
//     // const isMillenial = function () {
//     //   console.log(self.year >= 1981 && self.year <= 1996);
//     //   console.log(self);
//     // };

//     // Solution 2 -- new solution for ES6
//     const isMillenial = () => {
//       console.log(this.year >= 1981 && this.year <= 1996);
//       console.log(this);
//     };
//     isMillenial();
//   },

//   greet: () =>
//     console.log(
//       `Hey ***${this.firstName}*** arrow functions go to the global obj and this is not defined there. ***this = ${this}***so it goes to the global window obj.`
//     ),

//   greet2: function () {
//     console.log(`How does this resolve ${this}?`);
//     console.log(`Hey ${this.firstName}`);
//   },
// };

// jonas.greet();
// jonas.greet2();

// jonas.calcAge();

// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log('Friend:', friend);
// console.log('Me:', me);

let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log(lastName);
console.log(oldLastName);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

// Here we can create a new separate copy using the Object.assign().
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
