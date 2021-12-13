
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


