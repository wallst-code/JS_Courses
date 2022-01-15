'use strict';

/* 
underscore_case
  first_name
Some_Variable
  calculate_AGE
delayed_departure
*/

document.body.append(document.createElement('label'));
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
document.body.append(document.createElement('ul'));
const dataOut = document.querySelector('ul');

const button = document.querySelector('button');
button.textContent = 'Submit';

button.addEventListener('click', changeCase);

function changeCase() {
  const text = document.querySelector('textarea').value;
  //   console.log('text:', text);
  const rows = text.split('\n');
  //   console.log('rows:', rows);

  for (const [i, row] of rows.entries()) {
    // console.log(i, row);
    const [first, second] = row.toLowerCase().trim().split('_');
    // console.log('row: ', row, '\nfirst: ', first, '\nsecond:', second);
    // console.log('rows:', rows);

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    // console.log('Output: ', output);

    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
    const li = document.createElement('li');
    li.textContent = `${output.padEnd(75)}${'✅'.repeat(i + 1)}`;

    dataOut.appendChild(li);
  }
}
