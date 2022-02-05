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

// Implement the smooth scroll of the Learn More link.
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScroll.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log(e);
  console.log(e.target);
  console.log(
    'Current scroll (x,y) x is from the left and y is from the top',
    window.pageXOffset,
    pageYOffset
  );
  console.log(
    'height and width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // old way
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  ); //x and y positions
  window.scrollTo(0, 700);

  // Alt way with an object
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  // new and improved way - much shorter
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Implementing Event Propogation on the Bankist App
//rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

// // default behavior: .addEventListener() only listens for events in the bubbling phase.
// // the capuring phase is not generally very useful.
// // if you do want to propagate from the capturing phase, you can define a 3rd parameter in the event listener (event, funciton, true or false).
// // effect of the 3rd parameter is that the listener now listens to capturing phase and not the bubbling phase. this will largely look the same.
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(
//     'LINK',
//     'Target: ',
//     e.target,
//     'Current Target :',
//     e.currentTarget
//   );
//   // e.stopPropagation(); //this would prevent the bubbling up to the other parent elements
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(
//     'CONTAINER',
//     'Target: ',
//     e.target,
//     'Current Target :',
//     e.currentTarget
//   );
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log(
//       'NAV',
//       'Target: ',
//       e.target,
//       'Current Target :',
//       e.currentTarget
//     );
//     console.log(e.currentTarget === this); //true
//   }
//   // true
// );
// e.currentTarget === this
// "this" and e.currentTarget will be the same in any event handler.

// Stop propagation = e.stopPropagation

///////////// Selecting, Creating, Deleting Elements //////////////
// /////SELECTING ELEMENTS
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// document.querySelector('.header');
// console.log(document.querySelector('.header'));

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');

// const buttons = document.getElementsByTagName('button');
// console.log(buttons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and Inserting Elements
// // .insertAdjacentHTML

// //creates a DOM element that is stored in message - not used yet.
// const message = document.createElement('div');
// message.classList.add('cookie-message'); // add a class to the element

// //To put on the page, we must insert it.
// // message.textContent =
// //   'We use cookies for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// const header = document.querySelector('.header');
// // header.prepend(message);
// //Prepend makes it the first child of the DOM element
// // header.append(message); // Makes it the last child
// // header.append(message.cloneNode(true));

// header.before(message);
// // header.after(message);

// //Delete Elements - deletes once the button is clicked
// document
//   .querySelector('.btn--close-cookie') //we could use the classList as well.
//   .addEventListener('click', function () {
//     message.remove();
//   });

// ///////// Styles, Attributes, and Classes - use the exact string
// ////these are set as inline styles.
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.backgroundColor);
// //We can only retrieve inline styles that we have set ourselves
// //If we want to see the values in the CSS we can use getComputedStyle()

// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// console.log(getComputedStyle(message).height);
// // document.documentElement.style.setProperty('--color-primary', 'orangered');
// //You can set any properties this way.

// ////// Attributes //////
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// // You can read the standard properties that are expected with the type of element, but not ones that you add that are non-standard.
// //but you can access the non-standards by using logo.getAttribute('<attribute>')

// //Setting Attributes
// // logo.alt = 'Beautiful minimalist logo';
// logo.setAttribute('company', 'Bankist'); //Sets an attribute

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// //links
// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data Attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('test', 'j');
// logo.classList.remove('test-class');
// logo.classList.toggle('test-class');
// console.log(logo.classList.contains('test-class'));
// console.log(logo.classList.toggle('test-class'));

// console.log(logo.classList);

//////////// Event a signal generated by a DOM Node ////////
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('AddEventListenser: Great! You are reading the heading 😀');
//   // h1.removeEventListener('mouseenter', alertH1); // so it only triggers once
// };

// // h1.addEventListener('mouseenter', function (e) {
// //   alert('AddEventListenser: Great! You are reading the heading');
// // });

// // //Old school way - modern events use the addEventListener()
// // h1.onmouseenter = function (e) {
// //   alert('AddEventListenser: Great! You are reading the 2nd Alert Heading');
// // };

// h1.addEventListener('mouseenter', alertH1);

// //Will remove the event listener after 10 sec
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 10000);

//you can use the HTML attribute, but you should not use it.

///////////////// Event Propogation: Bubbling and Capturing /////////////////
