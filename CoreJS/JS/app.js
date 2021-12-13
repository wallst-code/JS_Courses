
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


