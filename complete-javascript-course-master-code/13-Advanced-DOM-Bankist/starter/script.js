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

////////////// Event Delegation: Implementing Page Nav
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// }); // but this is inefficient see below

// Event delegation - important technique
//1. Add event listener to common parent element
//2. Determine which element originiated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //matching strategy - ignore clicks that are not relevant
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////// Tabbed Component ////////////////////////
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Bad Practice - creates a copy for each tab elements.
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));
// Better Practice to listen to multiple like elements: Event Delegation by using the common parent of all the target elements.
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if (!clicked) return; //A guard clause - returns early if some condition is matched.

  //Clear the active tabs or content before turning the one clicked active again - resets.
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  //Activate the content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////// Passing Arguments into Event Handlers ///////////////////////////

//1. Use event delegation for the links and the logo - find the parent elements
// .nav
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //you can choose a higher up parent.
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Used bind() to pass an "argument" to our handler function.
// If we wanted to pass more than one value, you'd need to pass in an object or array.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////////// Sticky Navigation ////////////////////
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log('Y: ', window.scrollY, 'X: ', window.scrollX);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
////////////// Sticky Navigation: Intersection Observer API ////////////////////
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
//   // 0 sets it when out of view and moving into view.
//   // 1 = 100% and would trigger only when 100% is in the viewport.
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

//When do we want the navigation to become sticky? Basically, when the static header/nav would be out of view.

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

//We do not need the headerObserver {} as a parameter in this case.
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //we want something to happen when 0% is visible.
  rootMargin: `-${navHeight}px`, //90px outside of our target element. Will trigger x pixels before the trigger threshold.
});

headerObserver.observe(header);

//////////////////// Revealing Elements on Scroll ///////////////////////
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //turns off the observer.
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//////////////////// Lazy Loading Images ////////////////////////
// Here we select all the img that have the property data-src...
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // guard clause.
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //makes images start loading before the user arrives so they do not see it.
});

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////// Slider Component /////////////////////////
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-300px)';
  // slider.style.overflow = 'visible';

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);

  //attach keyboard events for slider -- using keyboard arrows to change slides ////////////
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') previousSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  ///// Slider Dots ////////////// see line 258-266
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////// DOM Traversing //////////////////////

// const h1 = document.querySelector('h1');

// // going downwards: selecting child elements - this only grabs the direct children of the element - not of the entire document
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.childElementCount);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // going upwards: selecting parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// console.log(h1.closest('.header'));

// h1.closest('h1').style.background = 'var(--gradient-primary)';
// //.closest() is the opposite of querySelector().
// //.querySelector() finds children regardless of depth.
// //.closet() only finds parents.

// //going sideways: selecting siblings - only direct siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

//
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

////////////////////////////// Lifecycle DOM Events //////////////////////
//Domcontent loaded - html is parsed and converted into the DOM Tree and all scripts have been downloaded.
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('Window Load Event', e);
// });

// // window.addEventListener('beforeunload', function (e) {
// //   e.preventDefault();
// //   console.log('Before unload', e);
// //   e.returnValue = '';
// // });
// window.addEventListener('load', function (e) {
//   alert('hello');
// });
