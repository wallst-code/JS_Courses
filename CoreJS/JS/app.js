
let testString = 'this is a test';
let testNumber = 45.87;
let testBoolean = true;

console.log(testString + " " + testNumber);

//hoisting would bring var i up here.
// i = 10;
// i = 5;

// console.log(i);
// here i is global in scope. 
// var i = 2; hoisting takes this var to the top of the other i variables. that is why 5 is still the answer. 

/*
j = 10;
j = 5;
console.log(j);

let j = 2; //creates a bug -- no hoisting here with let - it lets you know it is out of sequence. 
*/

// let a = 5, b =3, c =1; //you can do this but it is poor practice and confusing for code reading. 
/*
let x = 3;
let y = 2;
let result;  //semi-colons help with code readability and can prevent bugs where the end of the code line is confusing.

result = x + y;
result++;
result--;
result++;
result += x;
result -= y;
result *= y;
result /= y;
result **= y; //exponent
console.log(result);
*/
/*
let isAlive = true;
isAlive = !isAlive; //the ! point in front = not. 

console.log(!isAlive); //notice using the ! here does not change the value of the variable but prints the opposite. ! = bang character - a flipping of the boolean.
console.log(isAlive);
*/

// let birthday = new Date('September 15, 1990');
// let birthday = new Date(1990, 8, 15)
// console.log(birthday.getFullYear());
// console.log(birthday);

/*const firstName = 'Tim';
const lastName = 'Corey';
console.log(firstName + ' ' + lastName); //Concatenation but there is an easier way with...
console.log(`${firstName} ${lastName}`); //this uses the back ticks (` `) and $ with curly brackets (`${variable}`). String interpolation. */

//Arrays

const people = ['Tim', 'Sue', 'Mary', 'Bob']; //This creates an array object. You cannot create a new array because of the const, but you can change the values within that are held in the array.
people.push('Leeloo'); //appends a value to the end of the array.
// console.log(people);

const lastPerson = people.pop(); //pops the last element. There we capture it with a new variable, but it is popped out of the people[].
console.log(people);
console.log(people[2]); //remember zero index count - starts with zero. 
console.log(lastPerson);

//What if we do not know the index of the item within the array?

console.log(people.indexOf('Bob')); //this will return the index position of the item. 'Bob' returns index of 3.
// If it is not in the index, you will get a -1 result. You can use this number result for checking if name is unique - if -1, then it is, but if a positive number it is not. 

//Filter - very useful

console.log(lastPerson.startsWith('Lee')); //boolean result this is case sensative. 

people.push('Tom');
people.push('Tammy');
people.push('Barry');

console.log(people);

const coolPeople = people.filter(function(person){
    return person.startsWith('T') === true;
}) //function encapsulates a bit of code to run on every element within the target array. It got called once for each person in the list. It gives us a true or false value and then if true do x. 

console.log(coolPeople);

//Substring 
console.log(lastPerson.substring(0, 1)); //start index number and end position. 

//Map

const firstLetters = people.map(function(person){
    return person.substring(0, 1);
});

console.log(firstLetters);

//Loops











