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
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWords = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// //since this takes in a funciton as a parameter - this is a higher order function.
// const transformer = function (str, fn) {
//   console.log(`Original String: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// //The second parameter here is the callback function.
// transformer('JavaScript is the best!', upperFirstWords);
// transformer('JavaScript is the best!', oneWord);

// // JS uses callbacks all the time.
// const high5 = function () {
//   console.log('👋');
// };

// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam'].forEach(high5);

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
/* Setting the this keyword with the call and apply methods:  

CALL Method
*/
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}`
    );
    this.bookings.push({ flight: `${this.iataCode}  ${flightNum}`, name });
  },
};
lufthansa.book(239, 'Jonas');
lufthansa.book(222, 'John Smith');

console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// If we do this, we are storing into a new variable -- we
// turned our method into a regular function and we lose the power of using this inside of the object.
//So we use the call method below. book became a regular function call and thus the this keyword will point to undefined.
const book = lufthansa.book;

// book(23, 'Sarah Williams'); Does not work because it is now a regular function not a method.

//Call, Apply and Bind for setting this.
//Here we use the call function to call book and set the "this" to eurowings. Then pass in the regular arguments.
book.call(eurowings, 23, 'Sarah Williams');
book.call(eurowings, 25, 'Debbie Williams');
console.log(eurowings);

//The first argument of the call method - manually sets the this keywrod of any function we want to call.
//The next arguments are the original arguments of the function.
book.call(lufthansa, 239, 'Billy Bob');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Barbra Johnson');
console.log(swiss);

/* APPLY Method - does not take a list of arguments - 
it takes an array of arguments instead, but it is just like call.

NOT USED AS MUCH IN MODERN - because we can now use the spread operator
*/
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

//No need to use apply method with modern JS - just use the spread operator
book.call(eurowings, ...flightData);
console.log(eurowings);

//BIND Method - this returns a new function with the this keyword set to the function.
// const bookEW = book.bind(eurowings);
// bookEW(23, 'Steven Williams');

//We can then create one booking function and bind it to all the various airlines.
// With the bind() the first argument is the "this" keyword or what you set this to be. Below we set to objects.
const bookLH = book.bind(lufthansa);
const bookEW = book.bind(eurowings);
const bookLX = book.bind(swiss);

bookLX(67, 'Joe Bob');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');
console.log(eurowings);

/* With Event Listeners
 */
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};

/* Remember with an Event Handler or Listener the "this" keyword always points ot the element.
Here the handler function or event listener is attached to the button element. This is because 
the this keyword is dynmaically set outside of the function. 
 */
// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

/* To deal with this dynamic setting of this, we need to manually set the this keyword.
  We do not wnat to use the call() becuae that will call the method right away. 
  So we use the bind(). Bind() will use make a new function.
  */

// Partial Application - another use for the bind()
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// Here we bind the values to the addTax method (we set the this to null in this case)
//Order of arguments matters.
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;
console.log(addVAT(2000));
//2460
console.log(addVAT(100));
//123

//Coding Challenge - return a function from another to return what the addVAT does.
const addTaxRate = function (rate) {
  return function (value) {
    return rate * value + value;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

/* CODING CHALLENGE #1

 */
const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C#'],
  answers: new Array(4).fill(0),
  newtestCode() {
    console.log('New Test Code Triggered');
  },
  askQuestion() {
    let answer = Number(
      prompt(
        `${this.question} \n ${this.options.join('\n')}\n (Enter answer here: )`
      )
    );
    this.registerNewAnswer(answer);
    console.log('asking here', answer);
  },
  registerNewAnswer(answer) {
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
    console.log('registering here');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log('array results', this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
  getAnswers() {
    console.log('Get method triggered');
    return this.answers;
  },
};

// const pagePoll = document.querySelector('#poll');
const pollElement = document.getElementById('poll');
pollElement.addEventListener('click', poll.askQuestion.bind(poll));

function testCode(e) {
  console.log('Test Code Triggered');
}

let results = poll.getAnswers();
const displayOutput = document.createElement('p');
displayOutput.textContent = results;
document.body.appendChild(displayOutput);

console.log(poll);

console.log(results);
console.log(document.body.childNodes);
