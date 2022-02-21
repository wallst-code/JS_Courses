'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

/////////////////////////////////////////////////////////////////////////////

class Workout {
  //take in data that is common to both workouts
  date = new Date();
  id = (Date.now() + '').slice(-10); // used the date and last 10 numbers for a unique id.

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}
///////////////////////////////////////////////////////////////////////////
class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/KM
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
///////////////////////////////////////////////////////////////////////////
class Cycling extends Workout {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

////////////////////////////////////////////////////////////////////////
class App {
  // private instance properties go to all instances of this class.
  #map;
  #mapEvent;

  constructor() {
    //Loads right away
    this._getPosition();

    // Listener
    // In classes we will need to bind() the this keyword in event Listeners because the this becomes the form element without it.
    form.addEventListener('submit', this._newWorkout.bind(this));

    // this particular listener does not require bind().
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);
    console.log(position.coords.latitude, position.coords.longitude);
    //Grabbed URL from Google Maps
    console.log(`https://www.google.com/maps/@${latitude}, ${longitude}`);

    const coords = [latitude, longitude];
    console.log(`https://www.google.com/maps/@${coords}`);

    console.log(coords);

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    //Clear input fields
    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
    inputElevation.value = '';

    // Display the marker
    const { lat, lng } = this.#mapEvent.latlng;
    // Adds the marker to the map
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}
///////////////////////////////////////////////////////////////////

// Instantiate an object from the class
const app = new App();

// change from cycling to running
