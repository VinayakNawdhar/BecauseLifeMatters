'use strict';

// prettier-ignore
// window.addEventListener('load',function(){
//   document.querySelector(".preloader").style.display = "none";
//   document.querySelector(".preloader-container").style.display = "none";
// })

document.querySelector(".preloader").style.display = "none";
document.querySelector(".preloader-container").style.display = "none";

class Workout {
  date = new Date();
  id = (Date.now() + ' ').slice(-10);
  constructor(task, location, duration, timing, event,description) {
    this.task = task;
    this.location = location;
    this.duration = duration;
    this.timing = timing;
    this.event = event;
    this.description = description;
  }
}

const redZoneAreaMineBtn = document.querySelector('.red-zone-area-mine');
const redZoneAreaForm = document.querySelector('.red-zone-area');
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputTask = document.querySelector('.form__input--task');
const inputLocation = document.querySelector('.form__input--location');
const inputDuration = document.querySelector('.form__input--duration');
const inputTiming = document.querySelector('.form__input--timing');
const formBtn = document.querySelector('.form__btn');
const workouts = document.querySelector('.workouts');
const addRedZoneBtn = document.querySelector('.add-red-zone-btn');
const redZoneAreaBtn = document.querySelector('.red-zone-area-btn');

class App {
  #map;
  #mapEvent;
  mapCircles=[];
  #events = [];

  constructor() {
    this._getposition();
    form.addEventListener('submit', this._newWorkout.bind(this));
  }

  _getposition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position!');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '',
    }).addTo(this.#map);
    
    this.#map.on('click', this._showForm.bind(this));
    this._getLocalStorage();
    workouts.addEventListener('click', this._setViewFunction.bind(this));
  }
  _showForm(ev) {
    form.classList.toggle('hidden');
    inputTask.focus();
    this.#mapEvent = ev;
    // console.log(ev);
  }

  _newWorkout(e) {
    e.preventDefault();
    if (inputLocation) {
      let eventsObj = new Workout(
        inputTask.value,
        inputLocation.value,
        inputDuration.value,
        inputTiming.value,
        this.#mapEvent.latlng,
        `${inputTask.value.toUpperCase()} at ${inputTiming.value}`
      );
      // console.log(eventsObj);
      this._renderWorkoutMarker(eventsObj);
      this.#events.push(eventsObj);
      form.classList.toggle('hidden');
      clearFormField();
      this._addField(eventsObj);
      this._setLocalStorage();
    } else {
      alert('enter complete and correct details');
    }
  }

  _renderWorkoutMarker(eventsObj) {
    let popup = 'running-popup';
    if(eventsObj.duration.toLowerCase() == 'home'){
      popup = "cycling-popup";
    }
    let marker = L.marker([eventsObj.event.lat, eventsObj.event.lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 200,
          minWidth: 100,
          autoClose: false,
          closeOnClick: true,
          closeButton: true,
          className: popup,
        }).setContent(
          (eventsObj.duration).toUpperCase()
        )
      )
      .openPopup();
  }

  _addField(eventsObj) {
    // console.log(eventsObj);
    const phno = eventsObj.timing;
    form.insertAdjacentHTML(
      'afterend',
      `<li class="workout workout--running" data-id="${eventsObj.id}">
    <h2 class="workout__title">${eventsObj.task} @ ${
        eventsObj.timing
      }</h2>
    <div class="workout__details">
      <span class="workout__icon">🗺</span>
      <span class="workout__value">${eventsObj.location}</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">📞</span>
      <span class="workout__value">${phno}</span>
      <span class="workout__unit"></span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🏥</span>
      <span class="workout__value">${eventsObj.duration}</span>
      <span class="workout__unit"></span>
    </div>
  </li>`
    );
  }
  _setViewFunction(e) {
    const targetEl = e.target.closest('.workout');
    const id = targetEl.getAttribute('data-id');
    const targetedWorkout = this.#events.find(el => el.id === id);
    const { lat, lng } = targetedWorkout.event;
    this.#map.flyTo([lat, lng], 14);
  }
_setLocalStorage(){
  localStorage.setItem('vinayak',JSON.stringify(this.#events));
  localStorage.setItem('red-zone-area',JSON.stringify(this.mapCircles))
}
_getLocalStorage(){
  if (localStorage.getItem('vinayak')) {
    this.#events = JSON.parse(localStorage.getItem('vinayak'));
    for(let i=0;i<this.#events.length;i++){
      this._addField(this.#events[i]);
      this._renderWorkoutMarker(this.#events[i]);
    }
  }
  if(localStorage.getItem('red-zone-area')){
    this.mapCircles = JSON.parse(localStorage.getItem('red-zone-area'));
    for(let i=0;i<this.mapCircles.length;i++){
      this._createCircle(this.mapCircles[i].latitude,this.mapCircles[i].longitude,this.mapCircles[i].radius)
    }
  }
}
reset(){
  localStorage.clear();
  location.reload();
}
_createCircle(latitude,longitude,radius){
  L.circle([latitude,longitude], {radius: radius*10000,color : "red"}).addTo(this.#map)
}

}

const app = new App();

function clearFormField() {
  inputTask.value = '';
  inputLocation.value = '';
  inputDuration.value = '';
  inputTiming.value = '';
}

document.querySelector('.reset button').addEventListener('click',function(e){
  e.preventDefault();
  app.reset();
})

addRedZoneBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  redZoneAreaForm.classList.toggle('hidden');
})

redZoneAreaBtn.addEventListener('click',function(e){
  e.preventDefault();
  const latitude = document.querySelector('#red-zone-latitude').value;
  const longitude = document.querySelector('#red-zone-longtitude').value;
  const radius = document.querySelector('#red-zone-radius').value;
  if(latitude && longitude && radius){
    app.mapCircles.push({
      latitude : latitude,
      longitude : longitude,
      radius : radius
    })
    app._createCircle(latitude,longitude,radius)
    redZoneAreaForm.classList.toggle('hidden');
    app._setLocalStorage();
  }else{
    alert('Enter complete details')
  }
  
})

redZoneAreaMineBtn.addEventListener('click',function(e){
  e.preventDefault();
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      const coords = position.coords;
      app.mapCircles.push({
        latitude : coords.latitude,
        longitude : coords.longitude,
        radius : 10
      })
      app._createCircle(coords.latitude,coords.longitude,10)
      redZoneAreaForm.classList.toggle('hidden');
      app._setLocalStorage();
    })
  }else{
    alert('Unable to get your location')
  }
})