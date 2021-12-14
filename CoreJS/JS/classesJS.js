console.log("hello world");

// Classes

class Person {

    #social = '***-**-****'; // The # makes it private - we need to give it some value so it does not stay as undefined. 

    //constructor - no return statements in the constructor
    constructor (firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }    

    get ssn() {
        return `***-**-${this.#social.substr(this.#social.length - 4)}`; // "this" think of it as this instance. Instead of get "a" name you get "the" name.
    }

    set ssn(social) {
        this.#social = social;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // getFullName = () => `${this.firstName} ${this.lastName}`; // Lambda version works here as well. This works due to the instantiation aspects of a class. 

}

const person1 = new Person('Tim', 'Corey');
console.log(person1);

const person2 = new Person('Sue', 'Storm');
console.log(person2.lastName);

person1.ssn = '123-45-6788'; // this is setting the value using the setter in the class.
console.log(person1.ssn); //gives us back just the last 4 numbers. This is using the getter in the class. 
console.log(person1.social); //you do not see anything here.
console.log(person1.getFullName());
