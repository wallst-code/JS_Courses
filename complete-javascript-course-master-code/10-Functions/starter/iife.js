'use strict';
//IIFE - sometimes we need a funciton that is only executed once and then disappears. Uses: Async Await.
/*
const runOnce = function () {
  console.log('Standard Function - This will never run again.');
};
runOnce();
//But we could run it again.
//We want to execute it immediately and not even have to save it somewhere.

(function () {
  console.log('IIFEE - This will never run again.');
})(); /*Here we wrap the function in parentheses - it is treated as an expression.
we call it with the open parentheses as above. These is really just a funciton value and it gets run immediately - thus the IIFE immediately invoked function expression. 

We can do this for an arrow function as well.

//These functions run right away and then never again. 
*/
/*
(() => {
  console.log('🏹 Arrow Funciton IIFEE - This will never run again.');
  const isPrivate = 23;
})();
*/

//⭐ Why was this pattern invented? Functions create scopes. The global scope does not have access to inner scopes of functions. All data defined inside of a scope is private and encapsulated inside of the function scope. Scopes are good tools to hide variables. This is why IIFE was invented as a pattern. BUT IIFE are not used that much anymore, because it is easier to setup a block scope. Use it only if you need to invoke a funciton once and only once but immediately.

// Variables defined with let or const also create a block level scope, and are not visible outside of the scope. So a const inside of a function is not visible.

/* Closures - many students struggle to understand this and they are important. 
Closures bring the concepts of scope chaings, execution stacks, call stacks together.  ⭐ Closures are not explicitly used like we would when we create a new array or function. A closure happens automatically in certain situations but we need to recognize how and when.  */

// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++; //we update the parent variable.
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();
// // Why do the booker() calls below still access secureBooking(), since it has
// // run and is off of the call stack? This is because of closures. A closure makes a function remember all of the variables at the functions birthplace. This cannot be explained with the scope chain alone. Basically closure allows the inner function in secureBooking() to remember its variables -- he says that this inner funciton is essentially booker() - and that is not clear to me yet.

// booker();
// booker();
// booker();

//Looking into the closure backpack.
// console.dir(booker);

//More Closure Examples. This is a feature that is used frequently in JS.

// let f;
// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };
// g();
// f();
// //f was born in the global but then was assigned a function value and now it can still access g through closure. The "a" variable is inside the backpack.
// console.dir(f);

// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// // Here f has been reassigned to h
// h();
// f();
// console.dir(f);

// Here we note that the old closure disappears.

//Example 2
// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3;
//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait * 1000);

//   console.log(`Will start boarding in ${wait} seconds.`);
// };

// const perGroup = 1000; //this shows that closure has priority over the scope chain - because this global variable is in the global scope chain.
// boardPassengers(180, 3);

//Coding challenge #2 - really more a thinking challenge.
// const changeHeader = change =>
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
//end
