'use strict';

function calcAge(birthYear) {
  const age = 2022 - birthYear;

  function printAge() {
    const output = `${firstName} is ${age}, born in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1986) {
      const str = `Oh, and you are a millenial, ${firstName}.`;
      console.log(str);
      //   var millenial = true;

      function add(a, b) {
        return a + b;
      }
      console.log(add(2, 2));
    } else {
      const str = `${firstName}, you're not a millenial.`;
      console.log(str);
    }
    // console.log(millenial);
    // console.log(add(2, 3));
  }

  printAge();

  return age;
}

const firstName = 'Senit';
calcAge(1985);
