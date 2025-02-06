let apiKey = '3ce45f16d03cf19d7d51325c84a644ec';
let apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&';

let city = document.querySelector('.city');
let min = document.getElementsByClassName('minTemp')[0];
let max = document.getElementsByClassName('maxTemp')[0];
let temp = document.getElementsByClassName('temp')[0];
let weather = document.getElementsByClassName('weather')[0];

let searchBox = document.getElementsByClassName('Input')[0];
let searchBtn = document.getElementsByClassName('Btn')[0];

async function checkWeather(shehar) {
    try {
        let response = await fetch(`${apiURL}q=${shehar}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('This city has not exist.');
        }
        let data = await response.json();

        // Update HTML content
        city.innerHTML = data.name;
        min.innerHTML = `Min: ${data.main.temp_min}°C`;
        max.innerHTML = `Max: ${data.main.temp_max}°C`;
        temp.innerHTML = `${data.main.temp}°C`;
        weather.innerHTML = data.weather[0].main;

        console.log(data);
    } catch (error) {
        city.innerHTML = error.message;
        min.innerHTML = 0 ; 
        max.innerHTML = 0;
        temp.innerHTML = 0;
        weather.innerHTML = 'NON'
        console.error('Error fetching weather data:', error.message);
    }
}

searchBtn.addEventListener('click', () => {
    const cityName = searchBox.value.trim();
    if (cityName) {
        checkWeather(cityName);
    } else {
        console.log('Please enter a city name.');
    }
});
