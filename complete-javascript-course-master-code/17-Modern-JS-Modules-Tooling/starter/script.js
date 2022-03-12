// Importing Module
// import { addtoCart, totalPrice as price, qty } from './shoppingCart.js';
// console.log('Importing Module');
// addtoCart('bread', 5);

// console.log(price, qty);

// to import all elements of a module
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addtoCart('bread', 5);
ShoppingCart.addtoCart('Pizza', 7);
ShoppingCart.addtoCart('Soda', 12);
console.log(ShoppingCart.cart);
ShoppingCart.test();

//////////////// Top Level Await available for modules only in ES2022
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

// console.log('Start');
// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };
// getLastPost();

// const lastPost = getLastPost(); // this will just return the promise settlement not the value

// console.log(lastPost); // this will just return the promise settlement not the value

// // lastPost.then(last => console.log(last)); // this is the work around to get the value from the return statement.

// const lastPost2 = await getLastPost();
// console.log(lastPost2);
// console.log('last');

/////////////////////////// The Module Pattern ////////////////////////
