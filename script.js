// script.js
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "4d2beb2ccbcf6544651f742d63f7339f"; // Replace with your OpenWeatherMap API key
    const form = document.getElementById("location-form");
    const locationInput = document.getElementById("location-input");
    const weatherDisplay = document.getElementById("weather-display");
    const getLocationWeatherButton = document.getElementById("get-location-weather");
  
    // Fetch weather data based on location
    async function fetchWeather(location) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) throw new Error("Location not found");
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    }
  
    // Fetch weather data based on user's geolocation
    async function fetchWeatherByCoords(lat, lon) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) throw new Error("Unable to fetch weather data");
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    }
  
    // Display weather data
    function displayWeather(data) {
      weatherDisplay.innerHTML = `
        <div class="weather-card">
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Condition: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
      `;
    }
  
    // Event listener for form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const location = locationInput.value.trim();
      if (location) fetchWeather(location);
      locationInput.value = "";
    });
  
    // Event listener for geolocation button
    getLocationWeatherButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
          },
          (error) => {
            weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
          }
        );
      } else {
        weatherDisplay.innerHTML = "<p>Geolocation is not supported by your browser.</p>";
      }
    });
  });
  