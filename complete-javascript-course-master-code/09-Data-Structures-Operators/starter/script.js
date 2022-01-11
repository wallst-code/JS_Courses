'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order Received: Your ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to: ${address} by ${time}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}.`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log('main ingredients = ', mainIngredient);
    console.log('other ingredients = ', otherIngredients);
  },
};

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Randy',
};

//2021 update 3 new logical operators
//Add numGuests to all
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// console.log('rest1', rest1, 'rest2', rest2);
//This works due to short-circuiting - in the rest2 that property did not exist - so it was false and then used the default value and set it.

//The new way to do it with an OR Operator - it works the same as above but is more concise.
// This assigns a value to a variable if that variable is false.
//If false then it runs the second part.
//But we run into the zero problem again.
// rest1.numGuests ||= 100;
// rest2.numGuests ||= 100;
// console.log('rest1', rest1, 'rest2', rest2);

//We can use the Nullish Assignment Operator here as well. For null and undefined to short-circuit.
// rest1.numGuests ??= 100;
// rest2.numGuests ??= 100;
// console.log('rest1', rest1, 'rest2', rest2);

//Nullish Coalescing Operator (??)
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// The AND Short-Circuit trips when the first value is false.
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

//The new way to do this.
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

//***************************************************************************** */
// // Nullish Coalescing Operator (??) - fixes the falsey problem with the or circuit breaker and 0 value.
// // Nullish values = null and undefined. 0 or '' is not nullish.
// // Only nullish values will short-circuit the evaluation.
// // So if the 1st value was null or undefined, it would short-circuit.
// const guestsCorrect = restaurant.numGuests ?? 10;
// console.log(guestsCorrect);

// // Spread Operator is on the right side of the "=".
// const arr = [1, 2, ...[3, 4]];

// // Rest Pattern - Operator is on the left hand side of the "=".
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// // Objects with the Rest Pattern
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// //Functions with the Rest Pattern
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };
// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// //Now use the Spread Operator to send to the add() with the rest pattern.
// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('Cheese', 'meat', 'onion', 'olives', 'sausage');
// restaurant.orderPizza('cheese');

// // Check to see if a value exists and if not set a value - uses a ternary operator. BUt neither will work if 0 is the value because it is falsey. BUt there is a solution.
// restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// // Using Short-Circuit Operators and get the same result.
// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log(
//   '***********************AND Operator**********************************'
// );
// // The && Short-Circuit
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('hello' && 23 && null && 'jonas');
// //null is a false value and so the logic short-circuits there.

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'olives');
// }

// //This is exactly the same as the if statement above. It evaluates the first statement or value
// // and then if true will run the second part...
// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'meat');

//Get user input and place the data into an array that then you can use the spread operator on.
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];
// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

//Since the 2018 ES6 update - the spread operator can be used on objects even though they are not iterables.
//Objects - create a brand new object by copying the properties and you can add more using the spread operator.
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log('new restaurant obj + additonal properties ', newRestaurant);
// console.log('original restaurant obj ', restaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'New name';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

// const arr = [7, 8, 9];
// const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArray);

// //Using the spread operator
// const newArr = [1, 2, ...arr];
// console.log(newArr);

// const blue = [2, 5, 60];
// const newNewArr = [10, ...blue];
// console.log(newNewArr);

// console.log(...newNewArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// //merge arrays and make a shallow copy of an array
// const mainMenuCopy = [...restaurant.mainMenu]; // a shallow copy of the array.

// //join two or more arrays
// const joinMenus = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(joinMenus);

// //The spread operator works on all iterables in JS --- arrays, strings, maps, sets, but not objects.

// const str = 'Jonas';
// const letters = [...str, '', 'S.'];
// console.log(letters);

// console.log(...str);

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1,
// });

// //object destructing...unlike deconstructing an array, with an object the order does not matter.
// // this is very useful for getting info from API's - deconstrucing the JSON
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // If we want to rename the properties from the object to our own variable names.
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// // Default values if it does not exist within the object.
// const { menu = [], starterMenu = [] } = restaurant;
// console.log(menu, starterMenu);

// // Mutating variables:
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };

// // Must wrap this in () to work - or JS expects a code block when it sees {}.
// ({ a, b } = obj);

// console.log('a =', a, 'b =', b);

// // Nested Object Deconstructing - example: restaurant obj, opening hours
// const {
//   fri: { open, close },
// } = openingHours;
// console.log('open = ', open, 'close = ', close);

// // const arr = [2, 3, 4];
// // const a = arr[0];
// // const b = arr[1];
// // const c = arr[2];

// // // This is the destructing assignment.
// // const [x, y, z] = arr;
// // console.log(x, y, z);
// // // so the structure above breaks the array into separate variables.
// // // the original array is still intact.

// // let [main, , secondary] = restaurant.categories;
// // console.log('main = ', main, '\nsecondary = ', secondary);

// // const temp = main;
// // console.log('main: ', main);
// // main = secondary;
// // console.log('main: ', main);
// // secondary = temp;
// // console.log('secondary: ', secondary);
// // console.log('main =', main, '\nsecondary = ', secondary);

// // // Just reassigning the two variables and we do not need the temp variable in the middle.
// // [main, secondary] = [secondary, main];
// // console.log('main =', main, '\nsecondary = ', secondary);

// // console.log(restaurant.order(2, 0));

// // // Recieve two return values from a function.
// // const [starterCourse, mainCourse] = restaurant.order(2, 0);
// // console.log('starterCourse =', starterCourse, '\nmainCourse =', mainCourse);

// // // What about decontrusting nested arrays?
// // const nested = [2, 4, [5, 6]];
// // // const [i, , j] = nested;
// // // console.log(i, j);
// // const [i, , [j, k]] = nested;
// // console.log(i, j, k);

// // // Setting default variables for when we destruct them...for unknown array lengths.
// // // const [p, q, r] = [8, 9];
// // // console.log(p, q, r);
// // // since our decontruction was longer than the actual array that was targeted, it left the unused variable(s) as undefined.
// // // but we can set default values also.
// // const [p = 1, q = 1, r = 1] = [8, 9];
// // console.log(p, q, r);
