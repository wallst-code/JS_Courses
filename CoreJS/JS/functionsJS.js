
function add(x = 6, y = 6) { // Here we set default values if nothing is passed. 
    console.log(`Hello from my add function - you passed ${x} and ${y} - the answer is ${x+y}`);
    return x + y;
}

console.log(add(2,3));
console.log(add(0,0));

let result = add(2, 5);
console.log(result); // The inner function runs and returns the value back to the calling function (in this case that is console.log()). 

console.log(add(2, 5) + result);

console.log(add()); // this uses the default values that are set.
console.log(add(0,)); // this would run as well. 





