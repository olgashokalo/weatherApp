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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                    <div class="col-2 ">
                        <div class="weather-forecast-day"> ${formatDay(
                          forecastDay.time
                        )} </div>
                        
                        <img src= ${
                          forecastDay.condition.icon_url
                        } alt="" width="50">

                        <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-max"> ${Math.round(
                              forecastDay.temperature.maximum
                            )}°/</span>
                            <span class="weather-forecast-temperature-min">${Math.round(
                              forecastDay.temperature.minimum
                            )}°</span>
                        </div>
                    </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiKey = "3632a7c9224763143fe6obtb61dff025";
  let apiUrl = ` https://api.shecodes.io/weather/v1/forecast?lon=${coords.longitude}&lat=${coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coordinates);
}
function searchPosition(position) {
  let apiKey = "3632a7c9224763143fe6obtb61dff025";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
let curLocRes = document.querySelector("#currentLocationResult");
curLocRes.addEventListener("click", showCurrentPosition);

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

search("London");
