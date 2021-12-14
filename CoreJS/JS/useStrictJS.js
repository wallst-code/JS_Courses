'use strict';
// Strict - place this 'use strict' at the top of the file. It will disallow certain actions. Helps avoid errors.

let myTest = 3;
// MYtest = 3; this helps us avoid spelling errors in a case sensative environment. You must declare variables before you use them.

// We will use this from now on. We can also put this inside of a function.

function test() {
    'use strict';
    //code here
}

(function(app){
    'use strict';
    myApp.greetMe = function() {
        console.log('********** Hello User *******************');
    }
})(window.myApp = window.myApp || {});

myApp.greetMe();