
function add(x = 6, y = 6) { // Here we set default values if nothing is passed. 
    console.log(`Hello from my add function - you passed ${x} and ${y} - the answer is ${x+y}`);
    return x + y;
}

// console.log(add(2,3));
// console.log(add(0,0));

// let result = add(2, 5);
// console.log(result); // The inner function runs and returns the value back to the calling function (in this case that is console.log()). 

// console.log(add(2, 5) + result);

// console.log(add()); // this uses the default values that are set.
// console.log(add(0,)); // this would run as well. 

// function greetUser(){
//     console.log('Hello user.');
//     console.log('Welcome to our website.');
//     console.log(`The value of 5 and 3 is ${5 + 3}.`);
// }

// greetUser();

// Arrow Function -- these can be really helpful in our for each loops or in maps filtering. 

const subtract = (x, y) => {
    return x - y;
}

const addMore = (x, y) => x - y;

console.log(subtract(5, 3));
console.log(addMore(5, 2));

const cars = ['Toyota', 'Ford', 'Chevy', 'Tesla'];
const filtered = cars.filter(c => c.substring(0, 1) === 'T');
console.log(filtered);

const moreFiltered = cars.filter(function(c) {
    return c.substring(0, 1) === 'F';
});

console.log(moreFiltered);


