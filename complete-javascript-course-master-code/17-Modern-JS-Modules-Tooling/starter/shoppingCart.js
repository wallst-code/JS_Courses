// Exporting Module
console.log('Exporting Module');

const shippingCost = 10;
export const cart = [];

//Example of a named export
export const addtoCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
};

export function test() {
  console.log('Test Function');
}

const totalPrice = 237;
const totalQuantity = 23;
export const triplePrice = 0;

// Using named exports to export multiple variables
export { totalPrice, totalQuantity as qty };
console.log(cart);
