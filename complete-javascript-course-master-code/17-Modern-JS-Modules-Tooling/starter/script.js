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
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;
  const addtoCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to the cart`);
  };
  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} was ordered from the supplier`);
  };

  // we return an object - this exposes to the outside
  return {
    addtoCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addtoCart('apples', 12);
ShoppingCart2.addtoCart('pizza', 5);
console.log(ShoppingCart2);

// this stays private and thus is undefined
// console.log(ShoppingCart2.shippingCost);

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
