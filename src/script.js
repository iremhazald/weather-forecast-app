function displaySearchedData(response) {
  console.log(response.data.city);
  let temperatureElement = document.querySelector("#currentTemperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#cityName");
  let description = document.querySelector("#cityDescription");
  let humidity = document.querySelector("#humidityNumber");
  let windSpeed = document.querySelector("#windSpeed");
  let rightIcon = document.querySelector("#rightIcon");
  cityElement.innerHTML = response.data.city;
  rightIcon.innerHTML = `<img src="${response.data.condition.icon_url}" />`;

  temperatureElement.innerHTML = temperature;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  console.log(response.data.city);
  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#searchFormInput");
  searchCity(searchInputElement.value);
}

function searchCity(city) {
  let apiKey = "1e4573e080b57c89fadd0873aeof420t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaySearchedData);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", search);

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
  return `${formattedDay} ${hours}:${minutes}, `;
}

let currentDateELement = document.querySelector("#cityTime");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

searchCity("İstanbul");

function displayForecast(response) {
  let forecastHtml = "";
  console.log(response.data);

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        ` 
         <div class="days">
            <div class="theDate">${formatDay(day.time)}</div>
            <div id="theIcon"> <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" /></div>
            <div class="theTempature">
              <span class="dayLight"
                ><span class="dayLightTemp">${Math.round(
                  day.temperature.maximum
                )}º</span>
                <span class="night"> ${Math.round(
                  day.temperature.minimum
                )}º</span>
              </span>
            </div>
          </div>
       `;
    }
  });
  let secondRow = document.querySelector(".secondRow");
  secondRow.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "1e4573e080b57c89fadd0873aeof420t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
getForecast("İstanbul");
