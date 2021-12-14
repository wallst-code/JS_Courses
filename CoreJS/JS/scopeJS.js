//Scope
// Where we can see variables (or what we can see at the loevel we are at). 
// window is out global scope in JS (i.e. window.console.log();).

var a = 4; // This is in the global scope (i.e. window.a).

// This function creates its own scope and what is declared in there stays in there.
function testing() {
    var a = 5;
    // a = 5; // this would fall back to the global because it is not declared in the function. In htis case the gloabal and the local would be 5.
    console.log(`Inside of testing(): ${a} and this is due to its self-contained scope.`);
    console.log(`On the other hand we can talk to a global variable (window.a) which is: ${window.a}`);
}

testing();
console.log(`global: ${a}`);

// Functions and Classes create a new scope that is not global. 
// "var" is function scoped, and the only time you will not step on toes, is if it was declared within a class or function {}.

var b = 4;

if (true) {
    var b = 5;
}
// The lesson here is that even though we have {}, this alone is not enough to create its own scope for the variables declared and contained within it.

console.log(`The value from the if statement is ${b}`);

let c = 4;

if (true) {
    let c = 5;
}
// But here using "let" and "const" are not scoped at the function level but at the "block-level or block-scoped". They will only live within the {} to which they were declared within.
// Block-scoped variables will not step on the toes of the parent. 
// Best practice is to use "let" and "const" whenever possible and you should have a really good reason to use "var".

console.log(`The value from the if statement is ${c}`);

var d = 4;

if (true) {
    let d = 5;
    console.log(`The value from the if statement is ${d}`);
}

// console.log(`The value from the if statement is ${d}`); // this causes an issue because we reference the global and not the block scoped. 