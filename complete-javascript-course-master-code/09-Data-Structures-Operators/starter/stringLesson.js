'use strict';

const airline = 'TAP Air Portugal';
const plane = 'A320';

//String is bascically an array of letters, and we can get a letter at a certain position.
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);

//Grabbing a letter out of a string
console.log('\n');
console.log('B737'[0]);

//Get the length of a string on a variable containing a string or directly on the string.
console.log('\n');
console.log(airline.length);
console.log('B737'.length);

//String Methods - some are very similar to array methods.
//Strings are also zero-based.
console.log('\n');
console.log(airline.indexOf('r'));
console.log(`The \'r\' in \'${airline}\' is at index: ${airline.indexOf('r')}`);
// index 6

console.log(airline.lastIndexOf('r'));
//10

//Note this is case sensative, and if wrong case will return -1 - this can be used in coding at times.
console.log(airline.indexOf('Portugal'));
console.log(airline.indexOf('portugal'));

//What can we do with these indexes? Slice method...
//The first parameter in slice is where the extraction will start.
//The second parameter is where it will end. **The end point is not included. So always add +1 to your end point.
console.log(airline.slice(4));
console.log(airline.slice(4, 7));

//Strings are immutable, and so if you want a new string it has to be placed into a variable.
//This is why we are using console.log().
//Below - we slice from the zero index until we hit the first space (must have a space in your ' ') using the indexOf().
console.log(airline.slice(0, airline.indexOf(' ')));
//TAP

//Extract the last word: **note - we do not need the end parameter in this case.
//The +1 at the end removes the space.
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
//Portugal

console.log(airline.slice(-2));
//extracts from the end 'al'

console.log(airline.slice(1, -1));
// 'AP Air Portuga' - slice off the front and the last.

const checkMiddleSeat = function (seat) {
  //B & E are middle seats
  //   let seatNum = seat.slice(0, 2);
  let seatLetter = seat.slice(-1);
  seatLetter === 'B' || seatLetter === 'C'
    ? console.log(`Seat ${seatLetter} is a middle seat`)
    : console.log(`Seat ${seatLetter} is not a middle seat`);
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

//Boxing and Unboxing - taking a primative string and boxing it into an object when we call
//a method on the string. When finished it is returned to a primitve - unboxed.

console.log('\n***************Boxing & Unboxing*********************');
console.log(typeof new String('Joans'));
//returns an obj type

console.log(typeof new String('Joans').slice(1));
//returns a primitive type

console.log(
  '\n********************Changing the case of the string**************************'
);
//Changing the case of a string - no arguments are required.
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//calling that directly
console.log('My name is: '.toLowerCase());
console.log('My name is: '.toUpperCase());

//Fix capitalization in a passenger name
const passenger = 'jOnAS';
const passangerLower = passenger.toLowerCase();
const passangerFixed =
  passangerLower[0].toUpperCase() + passangerLower.slice(1);
console.log(
  `Before the name is fixed: ${passenger}, and after it is fixed ${passangerFixed}`
);

function correctPassangerName(passenger) {
  const name = passenger;
  const lowerCase = name.toLowerCase();
  const correctedName =
    passangerLower[0].toLocaleUpperCase() + passangerLower.slice(1);
  console.log(`Corrected passenger name: ${correctedName}`);
}

correctPassangerName('jONas');

//Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@JonAs.Io\n';

const compareEmail =
  email.toLowerCase() === loginEmail.trim().toLowerCase()
    ? console.log(
        `The emails are the same: ${email} vs ${loginEmail
          .trim()
          .toLowerCase()}`
      )
    : console.log(
        `The emails are not the same: ${email} vs ${loginEmail
          .trim()
          .toLowerCase()}`
      );

console.log('***********************************\n');

function compareUserEmails(email, loginEmail) {
  const normalizedLoginEmail = loginEmail.trim().toLowerCase();
  email === normalizedLoginEmail
    ? console.log('Test Passed: True, emails are the same.')
    : console.log('ERROR: False, emails are not the same.');
}
compareUserEmails(email, loginEmail);

//Replace parts of strings
const priceGB = '288,97$';
const priceUS = priceGB.replace(',', '.').replace('$', '$$$');

console.log(priceUS);

const announcement =
  'All passangers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
//Note that only the first occurence of 'door' was replaced with gate.
//Use replaceAll() which is an update.

console.log(announcement.replaceAll('door', 'gate'));

//Another way using regular expression for the replace method target.
//Here we use /   / to replace the ' ' and the g flag stands for global and will change all.
//Replace method is case sensative
console.log(announcement.replace(/door/g, 'gate'));

//3 simple methods that return booleans: includes(), startsWith(), endsWith().
const newPlane = 'Airbus A320neo';
console.log(newPlane.includes('A320'));
console.log(newPlane.includes('Boeing'));
console.log(newPlane.startsWith('Air'));
console.log(newPlane.startsWith('A3')); //This is true
console.log(newPlane.endsWith('ing'));

if (newPlane.startsWith('Airbus') && newPlane.endsWith('neo'))
  console.log('True - new part of the Airbus lineup.');

//Practice Exercise
/*Note when we receive input from a user, we generally start by putting everything in lower case
to normalize the data
 */
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('🚫 You are not allowed on board.');
  } else {
    console.log('🙂 Welcome aboard - enjoy your flight.');
  }
};

checkBaggage('Lap top, some Food, and gifts');
checkBaggage('Clothes, Wine, and Machine guns');
checkBaggage('Snacks and gun for protection');

//Split Method

console.log('A+very+nice+string'.split('+'));
console.log('Senit Lutgen'.split(' '));

//Splits into separate arrays
const [firstName, lastName] = 'Senit Lutgen'.split(' ');

//Join Method - the opposite of split()
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const newName1 = ['Mr.', firstName, lastName.toUpperCase()].join('++++');
console.log(newName1);

//Function to capitalize names (i.e. Title Case)
const capitalizeName = function (name) {
  const changeNameCase = name.toLowerCase().split(' ');
  const namesUpper = [];
  const namesUpper2 = [];
  for (const n of changeNameCase) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
    //alt way
    namesUpper2.push(n.replace(n[0], n[0].toUpperCase()));
  }
  //without the join
  console.log(namesUpper, 'Without the join they are in arrays');
  console.log(namesUpper.join(' '));

  console.log('Using the alt way with replace... ', namesUpper2.join(' '));
};

const passenger12 = 'jessica ann smith davis';

capitalizeName(passenger12);
capitalizeName('senit lutgen');
capitalizeName('jessica ann smith davis');

//Padding a string
const message = 'Go to gate 23.';
console.log(message.padStart(25, '+'));
console.log(message.padStart(100, '+'));
console.log(message.padEnd(100, '-+-'));

//Masking - generally we can only see the last four numbers - using padStart()
const maskCreditCard = function (number) {
  const str = number + ''; //this works becasue it converts to a string if one operand is a string.
  //   const formalStr = String(number);
  const lastFour = str.slice(-4);
  return lastFour.padStart(str.length, '*');
};

console.log(maskCreditCard(1231231));
console.log(maskCreditCard(12312569234889234));
console.log(maskCreditCard('2342342354235235234523542352352'));

//Repeat()
const repeatingMessage = '⛈ Bad weather... All Departures Delayed...\n';
console.log(repeatingMessage.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${' ✈ '.repeat(n)}`); //had to make the emoji a string with ' '.
};

planesInLine(5);
planesInLine(25);

const stringObj = new String('Hello foo');
console.log(typeof stringObj, stringObj);

const regOldStr = 'Hello foo';
console.log(typeof regOldStr, regOldStr);
