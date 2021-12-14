// Pronounce as (If - ee)

// IIFE - Immediately Invoking Function Expression
// Most of the other scripts will be 3rd party scripts - like React and Angular...we can get into naming conflicts, so we can use IIFE for our code. 
// IFEE's do not pollute the global namespace, avoid conflicts, and help us organize and keep some things private. 

const myName = 'Tim Corey';

//IIFE Statement
(function(app){
    app.greetUser = function() {
        console.log('Hello User');
    }    
})(window.app = window.app || {});

(function(app, fullName){
    app.fullName = fullName;
    otherApp.greetUser = function() {
        console.log(`Hello ${app.fullName} ************************`);
    }
    app.Person = class {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }
})(window.otherApp = window.otherApp || {}, myName)

console.log(window.app); 

function greetUser() {
    console.log('Hello to our app user');
}

greetUser(); // this one stepped on the toes of the first function. This is what IIFE is for. 
app.greetUser(); //this keeps our function in one namespace an it will not step on toes of other scripts. 

// You can use IIFE for classes
const p = new otherApp.Person('Sue', 'Storm');
console.log(p.firstName);

// You can also extend IIFE's

otherApp.greetUser();

