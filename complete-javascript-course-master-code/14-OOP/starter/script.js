'use strict';

// Constructor Function -- it is called with the new operator
// Constructor Functions capitalize the first letters as a rule.
// Arrow functions will not work with constructor functions

// const Person = function (firstName, birthYear) {
//   //instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;
//   console.log(this);

//   // adding methods
//   // ************** NEVER CREATE A METHOD IN A CONSTRUCTOR FUNCTION ***********************//
//   // This creates poor performance
//   //   this.calcAge = function () {
//   //     console.log(2037 - this.birthYear);
//   //   };
// };

// const jonas = new Person('Jonas', 1991);
// // console.log(jonas);

// // 1. New {} is created
// // 2. function is called, this = {} (execution context)
// // 3. {} is linked to a prototype
// // 4. function automatically returns {}

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);

// const jay = 'Jay';
// console.log(jonas instanceof Person);
// console.log(jay instanceof Person);

//////////////// Prototypes ////////////////////
// console.log(Person.prototype);

// // this provides prototypal inheritance to methods to the instances vs a copy for each.
// // SETTING METHODS ON THE PROTOTYPE
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge();
// console.log(jonas);

// // const jenny = new Person('Jenny', 1971);
// // jenny.calcAge();

// console.log(jonas.__proto__);
// //obj.__proto__ is a special property that each prototype has.
// //it shows the attributes and methods available.
// console.log(jonas.__proto__ === Person.prototype);
// //true
// // Note the Person.prototype is the prototype that will be used on all instances
// // with the constructor function - it is not the class itself.
// // It is not the prototype of Person, but rather of linked objects.
// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(Person));

// // SETTING PROPERTIES ON THE PROTOTYPE
// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species);

// jonas.species = 'Homo No Mo';
// console.log(jonas.species, matilda.species);

// console.log(jonas.hasOwnProperty('firstName'), 'instance variable');
// console.log(jonas.hasOwnProperty('species'), 'has own prop', jonas.species);
// console.log(matilda.hasOwnProperty('species'), 'has own prop', matilda.species);
// console.log(jonas);

// //////////////// PROTOTYPAL INHERITANCE AND THE PROTOTYPE CHAIN //////////////
// // See notes
// //////////////// PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS //////////////
// // Move up the prototype chain using 2x .__prototype__
// console.log(jonas.__proto__);
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);

// // console.dir
// console.log(Person.prototype.constructor);
// console.dir(Person.prototype.constructor);

// const arr = [3, 6, 7, 8, 9, 9, 6, 7, 10]; // new Array === [] is created by the array constructor.
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__); // The prototype itself is an object and thus has access to all of these methods.
// console.log(arr.__proto__.__proto__.__proto__);

// // Here we add a new function to the prototype constructor. Now all arrays will inherit this method.
// // However, adding a method to inherit is not a good idea on a built-in prototype.
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());
// //[3,6,7,8,9,10]

// const h1 = document.querySelector('h1');
// console.log(h1);
// console.dir(h1);

// console.dir(x => x + 1);

/////////////// Coding Challenge #1 //////////////////////////

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.make, 'Accelerating + 10 ', this.speed, ' MPH');
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(this.make, 'Braking -5 ', this.speed, ' MPH');
// };

// const car1 = new Car('BMW', 75);
// const car2 = new Car('Mercedes', 55);

// car1.brake();
// car1.brake();
// car1.accelerate();

// car2.brake();
// car2.brake();
// car2.accelerate();
// car2.accelerate();

////////////////// ES6 Classes /////////////////////
// 1. Classes are NOT hoisted - functions are - classes cannot be used before being declared.
// 2. Classes are First-Class-Citizens -- we can pass them and return them into and from function - because classes
// are really just special functions in ES6
// 3. Classes are executed in strict mode.
// Class expression and declaration just like functions

// Class expression
// const PersonCl = class {};

// Class declaration
// class PersonCl {
//   //constructor must be called constructor and must be first in order
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
// methods outside of constructor will be in the prototype for inheritance.
//   // methods will be added to .prototype property

//Instance Methods
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) {
//       console.log(name);
//       this._fullName = name;
//     } else {
//       alert(`${name} is not a full name!`);
//     }
//   }
//   get fullName() {
//     return this._fullName;
//   }

//   // Static Methods
//   static hey() {
//     console.log('Hey there 🙂');
//     console.log(this);
//   }
// }

// PersonCl.hey();

// const jessica = new PersonCl('Jessica Davis', 1996);
// // jessica.hey();

// // console.log(jessica);
// // jessica.calcAge();
// // console.log(jessica.__proto__ === PersonCl.prototype);

// // // You can still add a function/method manually
// // // PersonCl.prototype.greet = function () {
// // //   console.log(`Hey ${this.firstName}`);
// // // };

// // jessica.greet();
// console.log(jessica.age);
// console.log(jessica.fullName);
// console.log(jessica);

// ////////////////////////// Setters & Getters ////////////////////////
// // getters and setters are called accessor properties in ES6
// // they are functions that can retrieve and set data properties (state)
// // Very useful for data validation

// const walter = new PersonCl('Walter Dude', 1965);
// console.log(walter);

// const account = {
//   owner: 'Jonas',
//   movements: [200, 300, 234, 5000, -350],

//   //getter ---- prepend the get keyword
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   //Every setter must have at least one parameter...
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// // we call latest as if it was a property not a method.
// console.log(account.latest);

// // again, we treat the setter like a property not a function call.
// account.latest = 50;
// console.log(account.movements);

// //////////////////// Static Methods /////////////////////////
// //Example: Array.from() used on a querySelectorAll('h1')
// // -- must be selector all to access the nodelist - array like structure
// //the .from() is from the Array namespace.

// console.log(Array.from(document.querySelectorAll('h1')));
// console.dir(Array);

// const Person = function (firstName, birthYear) {
//   //instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;
//   console.log(this);
// };

// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// // Adding a static method to a constructor function
// Person.hey = function () {
//   console.log('Hey there 🙂');
//   console.log(this);
//   //Whatever object is calling the function will be the this keyword inside of that function.
//   // The this keyword is the entire constructor function
// };

// // Now this is in the constructor function but it will not be passsed to children (inherited).
// Person.hey();

// Not inherited it is a constructor function method.
// jonas.hey();

//*************** Whatever object is calling the function will be the this keyword inside of that function. */

//////////////// Object Create ////////////////////
// recreate the person class
// we can manually set the prototype of an object to anyother object we want.

// this will become the prototype (blueprint) for all Person Objects
// const PersonProto = {
//   calcAge() {
//     console.log(`${2037 - this.birthYear}`);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };
// // Now each person object will inherit this function.

// const steven = Object.create(PersonProto);
// // This will create an object that is linked to the PersonProto.
// console.log(steven);

// // Add some properties
// steven.name = 'Steven';
// steven.birthYear = 2002;

// console.log(steven);
// steven.calcAge();

// // console.log(steven.__proto__);

// const sarah = Object.create(PersonProto);
// // But a better way to set properties...
// sarah.init('Sarah', 1979);
// sarah.calcAge();

// //////////////////// Coding Challenge #2 ///////////////////
// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} has accelerated to ${this.speed}mph`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} has braked to ${this.speed}mph`);
//   }

//   get currentSpeed() {
//     return this.speed;
//   }
//   // Setter must have diff name or it will conflict with the constructor
//   set setSpeed(speed) {
//     this.speed = speed;
//   }
// }

// const BMW = new Car('BMW', 60);
// const Mercedes = new Car('Mercedes', 67);

// BMW.accelerate();
// BMW.accelerate();
// BMW.accelerate();
// BMW.brake();
// BMW.brake();
// BMW.brake();
// BMW.brake();

// Mercedes.accelerate();
// Mercedes.accelerate();
// Mercedes.accelerate();
// Mercedes.brake();
// Mercedes.brake();
// Mercedes.brake();
// Mercedes.brake();
// Mercedes.brake();

// console.log(BMW.currentSpeed);
// BMW.setSpeed = 50;
// console.log(BMW);
// console.log(BMW.speed);

////////////////////////// Inheritance Between Classes Constructor Functions /////////////////

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// //build constructor funciton for student
// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

//The prototype link must be set here. We must link this before setting any methods to the Student prototype.
// Order Matters Here!
//// LINKING PROTOTYPES
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName}, and I study ${this.course}`);
// };

// //create new student
// const mike = new Student('Mike', 2020, 'CS');
// console.log(mike);

// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.dir(Student.prototype.constructor);

// Student.prototype.constructor = Student;

// console.dir(Student.prototype.constructor);

// console.log(mike instanceof Student);
// console.log(mike instanceof Person);
// console.log(mike instanceof Object);

////// Coding Challenge #3 ///////////////
// skipped see notes

////////////////////////// Inheritance Between Classes - ES6 Classes /////////////////
//
class PersonCl {
  //constructor must be called constructor and must be first in order
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // methods outside of constructor will be in the prototype for inheritance.
  // methods will be added to .prototype property

  // Instance Methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) {
      console.log(name);
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }
  get fullName() {
    return this._fullName;
  }

  // Static Methods
  static hey() {
    console.log('Hey there 🙂');
    console.log(this);
  }
}

// for class inheritance we need 2 things: (1) extends keyword, and (2) super()
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // this needs to happen first.
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(
      `My name is ${this.fullName} and I am studying ${this.course}.`
    );
  }

  // Overriding (polymorphism) the parent calcAge()
  // Why - this now appears first in the prototype chain - and so it it found
  // sooner and the search in the chain stops.
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${this.birthYear + 10}`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'CS');
martha.introduce();
martha.calcAge();

////////////////////////// Inheritance Between Classes -- Object.create() /////////////////
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

// Now we want to add a prototype in the middle of the chain

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I am studying ${this.course}.`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'CS');
jay.introduce();
jay.calcAge();

///////////////// Another Class Example ////////////////
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    // We can add tings that have not been passed yet or even properties like navigator...
    // _ makes this a protected property (not actually private).
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}.`);
  }

  // Public interface
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  // this should be hidden via encapsulation
  _approveLoan(val) {
    return true;
  }

  //This should be public
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Your loan of ${val} was approved.`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// We could managage movements (deposits and withdrawls) like this, but
// it is better to create a function that handles that.
// acc1.movements.push(250);
// acc1.movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

console.log(acc1);
// this probably should not be publically accesbile.
console.log(acc1.pin);

//////////////////// Encapsulation: Protected Properties and Methods ///////////////////////////////
/** Public Interface: the parts that the public can see and access. 
API = application programming interface. 

Two major reasons that we need encapsulation and data privacy:
(1) To prevent code from outside of a classes to access and change the data within another class. 
(2) When we expose only a limited amount of public methods than we can change the other methods with more confidence when we update or change our code. It will not effect the user. 

Of course, JS does not support real privacy or data encapsulation.  */
console.log(acc1.getMovements());

///////////////////////// Encapsulation: Private Class Fields and Methods ////////////////////////////
class Account2 {
  //a public field - these will not just be prototype but in the actual instance
  // These are still accessible to the this keyword.
  locale = navigator.language;
  // _movements = [];

  // Private fields - truly unaccessible from the outside. Uses a # symbol
  // Again not on the prototype but in the instance.
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // We can add tings that have not been passed yet or even properties like navigator...
    // _ makes this a protected property (not actually private).
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}.`);
  }

  // Public interface public methods
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  _approveLoan(val) {
    return true;
  }

  //This should be public
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Your loan of ${val} was approved.`);
    }
    return this;
  }
  // Private methods
  // this should be hidden via encapsulation
  // #approveLoan(val) {
  //   return true;
  // }
}
console.log(Account2);
const acc2 = new Account2('May', 'EUR', 2222);
acc2.deposit(1500);
console.log(acc2);
// console.log(acc2.#movements); // no access due to private field.
console.log(acc2.getMovements());

///////////////////////////// Chaining Methods //////////////////////////
// acc2.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(4000);
// The above does not work, because we are calling the 2nd deposit method on a return of undefined
// Because the method does not return a value.
acc2.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(4000);
// We fixed this by adding return this; into the methods.
// look at the account to see
console.log(acc2);

////////////// Summary ES6 Classes - see notes
