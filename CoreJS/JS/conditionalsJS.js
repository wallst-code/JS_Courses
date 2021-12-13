//Conditionals - testing something for true or false and an action connected to the result. 

const fName = 'Tim';
const mName = 'guess';
const lName = 'Corey';

if (fName.toLocaleLowerCase() === 'tim' && lName.toLocaleLowerCase() === 'corey'){ //the curly braces here are the expected and normal convention for if statements in JS, also deal with case sensativity this way. 
    console.log('Hello teacher');
} else if (fName.toLocaleLowerCase() === 'tim') {
    console.log(`Hello other ${fName}`);

} else {
    console.log('Hello student');
}

const x = '1';
const y = 1;

if (x === y){
    console.log('values are equal - but not really if using == vs ===');
}

//Use internal () to separate the conditions and the order of how to read them. Here it can be either fName or Lname but it must also be the mName.
if ((fName.toLowerCase() === 'tim' || lName.toLowerCase() === 'corey') && mName.toLowerCase() === 'guess') {
    console.log('That is a cool name...');
}

// Switch Statements
const day = 'Tuesday';

switch (day.toLowerCase()) {
    case 'monday':
        console.log(`Welcome to ${day}.`);        
        break;

    case 'tuesday':
        console.log(`Welcome to ${day}.`);        
        break;

    case 'wednesday':
        console.log(`Welcome to ${day}.`);        
        break;        

    default:
        console.log('Unknown day of the week.')
        break;
}


