let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let weekDay = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${weekDay} ${hours}:${minutes}`;

// On your project, when a user searches for a city (example: New York), it should display the name of the city
// on the result page and the current temperature of the city.

// Get weather
function getTemperature(response) {
  // console.log(response);
  let currentCity = response.data.name;
  // console.log(response.data.name);
  let currentTemp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;

  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  // console.log(description);

  let searchCityInput = document.querySelector("#city");
  searchCityInput.innerHTML = currentCity;

  let heroTemp = document.querySelector("#hero-temp-number");
  heroTemp.innerHTML = currentTemp;

  let heroDescription = document.querySelector("#description");
  heroDescription.innerHTML = description;

  let heroHumidity = document.querySelector("#humidity");
  heroHumidity.innerHTML = `Humidity: ${humidity}%`;

  let heroWindSpeed = document.querySelector("#wind-speed");
  heroWindSpeed.innerHTML = `Wind Speed: ${windSpeed}mph`;
}

// Get position - user search
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let metric = "metric";
  let apiKey = "e02fbe81ce6386507731217f2f84b534";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${metric}`;
  axios.get(apiUrl).then(getTemperature);
}

// Get city - user search
function getCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#city-search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchCityInput.value;
  console.log(searchCityInput.value);

  let city = searchCityInput.value;
  let units = "metric";
  let apiKey = "e02fbe81ce6386507731217f2f84b534";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let userSearch = document.querySelector("#city-search-form");
userSearch.addEventListener("submit", getCity);

let userLocation = document.querySelector("#user-location");
userLocation.addEventListener("click", getCurrentLocation);

function getFarenheit(event) {
  event.preventDefault();
  let farenheitElement = document.querySelector("#hero-temp-number");
  let temperature = farenheitElement.innerHTML;
  farenheitElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function getCelcius(event) {
  event.preventDefault();
  let celsiusElement = document.querySelector("#hero-temp-number");
  let temperature = celsiusElement.innerHTML;
  celsiusElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let farenheitLink = document.querySelector("#hero-temp-far");
farenheitLink.addEventListener("click", getFarenheit);

let celciusLink = document.querySelector("#hero-temp-cel");
celciusLink.addEventListener("click", getCelcius);
