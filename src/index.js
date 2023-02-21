function showWeather(response) {
  document.querySelector("#currentCityName").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#icon-description").innerHTML =
    response.data.weather[0].description;
}
function search(city) {
  let apiKey = "48fa985e45676fd8f85f51b35990c0e0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function LetUsGo(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  search(city);
}

let cit = document.querySelector("#input-form");
cit.addEventListener("submit", LetUsGo);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let Day = days[now.getDay()];
let Month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
currentDay.innerHTML = `${Day}`;
currentDate.innerHTML = `${Month} ${now.getDate()}`;
currentTime.innerHTML = `${hour}:${minute}`;

function showCelsius(event) {
  let celsiusTemp = document.querySelector("#celsius-link");
  currentTemperature.innerHTML = "19";
}
function showFar(event) {
  event.preventDefault;
  let farenheitTemp = document.querySelector("#fahrenheit-link");
  currentTemperature.innerHTML = "66";
}

let temperatureCelsius = document.querySelector("#celsius-link");
temperatureCelsius.addEventListener("click", showCelsius);

let temperatureFar = document.querySelector("#fahrenheit-link");
temperatureFar.addEventListener("click", showFar);

function searchPosition(position) {
  let apiKey = "48fa985e45676fd8f85f51b35990c0e0";
  // let lat = response.coords.latitude;
  // let long = response.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
search("London");

let curLocRes = document.querySelector("#currentLocationResult");
curLocRes.addEventListener("click", showCurrentPosition);
