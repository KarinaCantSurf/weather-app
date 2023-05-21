let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function weatherConditions(response){
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function searchCity(city){
let apiKey = "4bf6dd58ef7c71749bcb90f0b43e9731";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
 axios.get(apiUrl).then(weatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position){
let apiKey = "4bf6dd58ef7c71749bcb90f0b43e9731";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
axios.get(apiUrl).then(weatherConditions);
}

function getCurrentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("New York");