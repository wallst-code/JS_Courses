'use strict';
const weekdays = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];

const openingHours = {
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
};

//
// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // openingHours: openingHours, //The old way.
  //ES6 enhanced obj literals
  openingHours,

  //ES6 Syntax for functions in obj - easier
  order(starterIndex, mainIndex) {
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

const days = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));
console.log(new Set(['Joans']));

console.log(ordersSet.size);

console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

ordersSet.add('Garlic Bread');
console.log(ordersSet);

ordersSet.delete('Risotto');
console.log(ordersSet);
console.log('*********************', Object.entries(restaurant));

// ordersSet.clear();
// console.log(ordersSet);

//Retrieving Values from a set -- there are no indexes - no ways to get values out of a set.
//No need - they are all unique and order does not matter. We only need to know it has a value.
//If you need to retrieve values - use an array.

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 5, 5, 6, 7, 8, 9, 10, 10];

const set = new Set(arr1.concat(arr2));
console.log(set);

//Loop a set
for (const order of ordersSet) {
  console.log(order);
}

//Convert an array into a set
const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter'];
const staffUnique = new Set(staff);
console.log(staffUnique);

//Convert a set into an array.
const staffUniqueArr = [...new Set(staff)];
console.log(staffUniqueArr);

//Maps
console.log(
  '\n**************************Maps***********************************'
);

const rest = new Map();
rest.set('key name', 'value');
rest.set(1, 'Italy');
rest.set(2, 'France');
rest
  .set('categories', ['Italian', 'Pizzaria', 'Vegan', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open 🙂')
  .set(false, 'We are closed 😟');
console.log(rest);
console.log(rest.get('key name'));
console.log(rest.get(true));

//using booleans with map

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

//has method to check for

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);
rest.clear();

// If you want to pass in an array as a key create the array and then pass it in.
//so we can use objects as map keys.
const newArr = [1, 2];
rest.set(newArr, 'Test');
console.log(rest.get(newArr));

rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

console.log('\n***********************Maps: Iteration*********************\n');
//Populating a map without set - method 2

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C#'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['Correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again! 😞'],
]);

console.log(question);

//There is an easy way to convert from objects to maps:
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
console.log('\n**********vs**************');
console.log(restaurant.openingHours);

//Iteration of maps
console.log(question.get('question'));

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// // const answer = Number(prompt('Your Answer: '));
// console.log(`Your answer: ${answer}`);

// answer === 3
//   ? console.log(question.get(true))
//   : console.log(question.get(false));

// //A different way to do what I did above
// console.log('**************A differnt way also');
// console.log(question.get(question.get('Correct') === answer));
//This way works because the inner get resolves to either true or false and that is what will be return and retrieve.

//Convert map to an array - build a new array and unpack with a spread operator
console.log([...question]);

//Other map methods
console.log(question.entries()); //returns all entries (i.e. Keys and Values)
console.log(question.keys()); //returns only keys in the map
console.log(question.values()); //returns only values in the map
