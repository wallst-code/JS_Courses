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

///////// Styles, Attributes, and Classes
