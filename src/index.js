function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  return `${Day},${Month} ${now.getDate()}, ${hour}:${minute}`;
}

function showWeather(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#currentCityName").innerHTML = response.data.city;
  document.querySelector("#currentTemperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#icon-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#currentTime").innerHTML = formatDate(
    response.data.time * 1000
  );
  document
    .querySelector("#icon-now")
    .setAttribute("src", response.data.condition.icon_url);

  document
    .querySelector("#icon-now")
    .setAttribute("alt", response.data.condition.description);
}
function search(city) {
  let apiKey = "3632a7c9224763143fe6obtb61dff025";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function LetUsGo(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  search(city);
}

let cit = document.querySelector("#input-form");
cit.addEventListener("submit", LetUsGo);

function showCelsius(event) {
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureCelsius.classList.add("active");
  temperatureFar.classList.remove("active");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}
function showFar(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureCelsius.classList.remove("active");
  temperatureFar.classList.add("active");
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

let temperatureCelsius = document.querySelector("#celsius-link");
temperatureCelsius.addEventListener("click", showCelsius);

let temperatureFar = document.querySelector("#fahrenheit-link");
temperatureFar.addEventListener("click", showFar);

function searchPosition(position) {
  let apiKey = "3632a7c9224763143fe6obtb61dff025";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let celsiusTemperature = null;
let curLocRes = document.querySelector("#currentLocationResult");
curLocRes.addEventListener("click", showCurrentPosition);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                    <div class="col-2">
                        <div class="weather-forecast-day"> ${day}</div>

                        <img src="" alt="" width="42">

                        <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-max">30° / </span>
                            <span class="weather-forecast-temperature-min">22°</span>
                        </div>
                    </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
search("London");
displayForecast();
