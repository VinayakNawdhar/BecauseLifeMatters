const cityNameHolder = document.querySelector('.city-name');
const weatherImage = document.querySelector('.weather-temp img');
const tempHolder = document.querySelector('.temp');
const weatherCondition = document.querySelector('.weather-condition');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const resetBtn = document.querySelector('.weather-time img');
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const weatherContainer = document.querySelector(".weather");

weatherContainer.classList.remove('reveal');
weatherContainer.style.trans
const updateWeather = function(){
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                      let pos = position.coords
                      const coords = [pos.latitude, pos.longitude];
                      let resp = axios
                    .get(
                      `https://api.weatherapi.com/v1/current.json?q=${coords[0]}%2C${coords[1]}&lang=english&key=aa1bfd843fba4c46a98181821232306`
                    )
                    .then(function (data) {
                      let weather = data.data;  
                      console.log(weather);
                      cityNameHolder.textContent = `${weather.location.name} , ${weather.location.country}`;
                      weatherImage.src = weather.current.condition.icon;
                      tempHolder.textContent = `${weather.current.feelslike_c} °C`
                      weatherCondition.textContent = weather.current.condition.text;
                      time.textContent = weather.location.localtime.slice(-5);
                      date.textContent = weather.location.localtime.slice(8,10);
                      month.textContent = months[+weather.location.localtime.slice(5,7)-1];
                      year.textContent = weather.location.localtime.slice(0,4);
                    });
                });
              }else{
                      alert('Unable to fetch your location!')
              }
              
};

updateWeather();

resetBtn.addEventListener('click',function(e){
        e.preventDefault();
        updateWeather();
})