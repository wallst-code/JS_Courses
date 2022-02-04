'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Removed the old school for loop.
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////// Selecting, Creating, Deleting Elements //////////////
/////SELECTING ELEMENTS
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.querySelector('.header');
console.log(document.querySelector('.header'));

const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

const buttons = document.getElementsByTagName('button');
console.log(buttons);

console.log(document.getElementsByClassName('btn'));

// Creating and Inserting Elements
// .insertAdjacentHTML

//creates a DOM element that is stored in message - not used yet.
const message = document.createElement('div');
message.classList.add('cookie-message'); // add a class to the element

//To put on the page, we must insert it.
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

const header = document.querySelector('.header');
// header.prepend(message);
//Prepend makes it the first child of the DOM element
// header.append(message); // Makes it the last child
// header.append(message.cloneNode(true));

header.before(message);
// header.after(message);

//Delete Elements - deletes once the button is clicked
document
  .querySelector('.btn--close-cookie') //we could use the classList as well.
  .addEventListener('click', function () {
    message.remove();
  });

///////// Styles, Attributes, and Classes - use the exact string
////these are set as inline styles.
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.backgroundColor);
//We can only retrieve inline styles that we have set ourselves
//If we want to see the values in the CSS we can use getComputedStyle()

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

console.log(getComputedStyle(message).height);
// document.documentElement.style.setProperty('--color-primary', 'orangered');
//You can set any properties this way.

////// Attributes //////
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
// You can read the standard properties that are expected with the type of element, but not ones that you add that are non-standard.
//but you can access the non-standards by using logo.getAttribute('<attribute>')

//Setting Attributes
// logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist'); //Sets an attribute

console.log(logo.src);
console.log(logo.getAttribute('src'));

//links
const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));
