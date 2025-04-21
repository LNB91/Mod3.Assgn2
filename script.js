const API_KEY = "feeb1e15933c3850daf212f6801a413c";
const weatherDisplay = document.getElementById("weatherDisplay");
const weatherData = document.getElementById("weatherData");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

// Fetch weather by city name
searchBtn.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        fetchWeatherByCity(city);
    } else {
        weatherData.innerHTML = "<p>Please enter a city name.</p>";
    }
});

// Fetch weather by user's location
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                weatherData.innerHTML = "<p>Unable to retrieve location. Please check your settings.</p>";
            }
        );
    } else {
        weatherData.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
    }
});

// Fetch weather data by city
function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
    fetchWeather(url);
}

// Fetch weather data by coordinates
function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    fetchWeather(url);
}

// Fetch and display weather
function fetchWeather(url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }
            return response.json();
        })
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            weatherData.innerHTML = "<p>Failed to fetch weather data. Please try again later.</p>";
        });
}

// Display weather data
function displayWeather(data) {
    const { name, main, weather } = data;
    const { temp, temp_min, temp_max, pressure } = main;

    weatherData.innerHTML = `
        <h3>${name}</h3>
        <p>Temperature: ${temp.toFixed(1)}°F</p>
        <p>Min Temperature: ${temp_min.toFixed(1)}°F</p>
        <p>Max Temperature: ${temp_max.toFixed(1)}°F</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Condition: ${weather[0].description}</p>
    `;
}
