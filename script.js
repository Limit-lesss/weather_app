const apiKey = config.apiKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

let searchBox = document.getElementById("search");
let searchBtn = document.getElementById("search_icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
  } else {
    let data = await response.json();
    document.querySelector(".error").style.display = "none";
    document.querySelector(".city").innerHTML = data.name;

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML = data.wind.speed + " km/h";

    let weather_img = data.weather[0].main.toLowerCase();
    if (weather_img == "clouds") {
      document.querySelector(".weather-icon").src = "images/clouds.png";
    } else if (weather_img == "clear") {
      document.querySelector(".weather-icon").src = "images/clear.png";
    } else if (weather_img == "mist") {
      document.querySelector(".weather-icon").src = "images/mist.png";
    } else if (weather_img == "drizzle") {
      document.querySelector(".weather-icon").src = "images/drizzle.png";
    } else if (weather_img == "snow") {
      document.querySelector(".weather-icon").src = "images/snow.png";
    } else if (weather_img == "rain") {
      document.querySelector(".weather-icon").src = "images/rain.png";
    }

    document.querySelector(".weather").style.display = "flex";
  }
}
searchBtn.addEventListener("click", () => {
  if (searchBox.value != "") {
    checkWeather(searchBox.value.trim());
  }
});
searchBox.addEventListener("keypress", (event) => {
  if (searchBox.value != "" && event.key === "Enter") {
    checkWeather(searchBox.value.trim());
  }
});
