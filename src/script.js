function displayTemperature(response) {
  let temperatureElement = document.querySelector("#currentTemperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#cityName");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#searchFormInput");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#cityTime");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

let defaultCity = "Los Angeles";
let apiKey = "1e4573e080b57c89fadd0873aeof420t";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
