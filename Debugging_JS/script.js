'use strict';

// Debugging JavaScript

(function(app){
    'use strict';
    app.divide = function(x, y) {
        return x / y;
    };
    app.complicatedFormula = function(x) { // this was just an example function to show how to debug...the slop is intentional. 
        let result = x * 3 + 2;
        console.log(result);
        result += 4;
        console.log(result);
        result = this.divide(result, 2);
        console.log(result);
        return result;
    };
})(window.app = window.app || {});

console.log(app.complicatedFormula(23));

// Different ways to use the console to debug.
// console.error("This is an error");
// console.warn('This is a warning');
// console.log('of course ou can use htis to debug as well.');

// Debug the complicatedFormula(); we use the console.log(result) to walk through it step by step to see the expected result at each stage (37.5).

/* 
Think through the simple mistakes and earlier mistakes before you start focusing on the most complicated possibilities. 
Simplicity is key. Wrong variables, misspellings, or wrong operators are common.
- What do you expect to happen at that line? 
- What actually happened? 
*/

