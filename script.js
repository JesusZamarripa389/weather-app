const API_KEY = 'c9901e6d967cfb95d2969560740efc60 ';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        showError();
    }
}

function displayWeather(data) {
    // Inyectar datos en el DOM
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;

    // Obtener e inyectar el icono oficial del clima
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Toque Pro: Cambiar fondo dinámico basado en el estado del clima
    const mainCondition = data.weather[0].main.toLowerCase();
    changeBackground(mainCondition);

    // Mostrar info y ocultar errores
    weatherInfo.className = "";
    errorMessage.className = "error-hidden";
}

function changeBackground(condition) {
    document.body.className = ""; // Limpiar clases previas

    if (condition.includes('clear')) {
        document.body.classList.add('sunny-bg');
    } else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
        document.body.classList.add('rainy-bg');
    } else if (condition.includes('cloud')) {
        document.body.classList.add('cloudy-bg');
    } else {
        document.body.classList.add('default-bg');
    }
}

function showError() {
    errorMessage.className = "error-message";
    weatherInfo.className = "weather-hidden";
}

// Eventos del buscador
searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== "") checkWeather(cityInput.value);
});

cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && cityInput.value.trim() !== "") checkWeather(cityInput.value);
});