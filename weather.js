const apiKey = "a9564ab82d5b8456aaceae8aea0bf377";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return
    }

    let data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";

    if (data.weather[0].main === "Clear") weatherIcon.src = "images/clear.png";
    if (data.weather[0].main === "Clouds") weatherIcon.src = "images/clouds.png";
    if (data.weather[0].main === "Rain") weatherIcon.src = "images/rain.png";
    if (data.weather[0].main === "Drizzle") weatherIcon.src = "images/drizzle.png";
    if (data.weather[0].main === "Mist") weatherIcon.src = "images/mist.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})