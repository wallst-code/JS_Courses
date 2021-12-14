console.log('Hello world');

//Objects in javaScript

// personFirstName = 'Tim';
// personLastName = 'Corey';
// We could do this way, but it is hard to add and then hard to keep the lists together matching firstnames to lastnames... So we can create an object like below (This is seems like a struct from C# in a way). 

// this creates an object that holds all the data for the person object. The property is camcel case with a colon property: 
const person = {
    personFirstName: 'Tim',
    personLastName: 'Corey',
    age: 42,
    isALive: true,
    address: {
        city: 'Dallas',
        state: 'Texas'
    }, // sub-object within the object. We do not need let. 

    // thisTest: this,

    // fullName: function() {
    //     return `${this.personFirstName} ${this.personLastName}`;
    // } // Note the use of the "this" keyword. "this" is looking for information within the object iwhtin its scope. //in the function, the "this" refers to its parent the object iteself. 
    //With JavaScript - this can get a bit confusing...a bit different than other languages - I think. 
    // fullName: () => `${this.personFirstName} ${this.personLastName}` //Arrow function...BUT "this" is different when using an arrow function. 
};

// person.personFirstName = 'Timothy';
// console.log(person.personFirstName);
// console.log(person.fullName());
// // console.log(person.thisTest); 

// function greetUsers(p) {
//     console.log(`Hello, ${p.fullName()}`); //make sure you use back ticks not quotes. 
// }

// greetUsers(person); // pass in the person object. 

// Deconstruct the object and just grab the properties that you are looking for.
// const {personFirstName: fn, age, address: {city}} = person; //see how personFirstName was renamed and used below. 

// console.log(fn);
// console.log();

// for (const prop in person){
//     console.log(`${prop}: ${person[prop]}`);
// } 

// for (const p in person){
//     if (person.hasOwnProperty.call(person, p)){ // the onlu reason to use this hasOwnProperty is to check if the object is inheriting from a parent. 
//         const element = person[p];
//         console.log(element);
//     }
// }


// for (const prop in person) {
//     if (Object.hasOwnProperty.call(person, prop)) {
//         const element = person[prop];         
//     }
// }

//Talking to APIs (Application Programming Interface): A way for one computer to talk to another (server and client generally).
//JSON Data - to demonstrate this we turned off our fullName function. we could do that by using delete person.fullName; as well. 

console.log(JSON.stringify(person)); //this prepares it to go to an API.

const recievedInfo = JSON.stringify(person); //note the stringify will actually strip out the function in the object - thus we did not need to delete it.

const parsedInfo = JSON.parse(recievedInfo);

console.log(parsedInfo);
console.log(parsedInfo.personFirstName);

