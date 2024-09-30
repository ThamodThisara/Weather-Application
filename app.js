const apiKey = "e5964b4ef51d4a5dbc2190433242809";
const apiUrl = "https://api.weatherapi.com/v1/current.json?";
const forecastUrl = "https://api.weatherapi.com/v1/forecast.json?";
const historicalDataUrl = "https://api.weatherapi.com/v1/history.json?"
 

document.getElementById("btn-Search").addEventListener("click",btnSearch);
document.getElementById("btn-Historical-Search").addEventListener("click", getHistoricalWeather);

function btnSearch() {
    let location = document.getElementById("inputLocation").value;

    clearWeatherInfo();
    
    if (!location) {
        showError('Please enter a location.');
        return;
    }

    fetch(`${apiUrl}key=${apiKey}&q=${location}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid location');
        }
        return response.json();
        })
        .then(data => {
            document.getElementById("error-message").innerHTML = '';

            document.getElementById("city").innerHTML = data.location.name;
            document.getElementById("time").innerHTML = "Date & Time :  " + data.location.localtime;
            document.getElementById("temp").innerHTML = "Temperature :  " + Math.round(data.current.temp_c) + "°C";
            document.getElementById("huminidity").innerHTML = "Huminidity :  " + data.current.humidity + "%";
            document.getElementById("wind").innerHTML = "Wind :  " + data.current.wind_kph + "Km/h";

            let currentWeather = data.current.condition.text;
            console.log(currentWeather);
            
            
            
            document.querySelector('.weather').style.display = 'block';

            document.querySelector('.dateBar').style.display = 'flex';

            updateWeatherIcon(currentWeather);
            forecast(location);

        })

        .catch(error => {
            showError('Location not found. Please enter a valid location.');
            console.error(error);
        });
}

function updateWeatherIcon(currentWeather) {
    const weatherIcon = document.getElementById("weatherIcon");

    if (currentWeather === "Clear") {
        weatherIcon.src = "img/sun.png";
    } else if (currentWeather === "Rain") {
        weatherIcon.src = "img/rain.png";
    } else if (currentWeather === "Patchy rain nearby") {
        weatherIcon.src = "img/patchlyrain.png";
    } else if (currentWeather === "Light drizzle") {
        weatherIcon.src = "img/Drizzle.png";
    } else if (currentWeather === "Snow") {
        weatherIcon.src = "img/snow.png";
    } else if (currentWeather === "Mist") {
        weatherIcon.src = "img/mist.png";
    } else if (currentWeather === "Cloudy") {
        weatherIcon.src = "img/cloudy.png";
    } else if (currentWeather === "Partly cloudy") {
        weatherIcon.src = "img/cloudy.png";
    } else if (currentWeather === "Overcast") {
        weatherIcon.src = "img/overcast.png";
    } else if (currentWeather === "Moderate or heavy rain with thunder") {
        weatherIcon.src = "img/Heavy-rain-with-thunder.png";
    } else if (currentWeather === "Light rain shower") {
        weatherIcon.src = "img/Light-rain-shower.png";
        weatherIcon.style.display = 'block';
    } else if (currentWeather === "Patchy light rain with thunder") {
        weatherIcon.src = "img/Heavy-rain-with-thunder.png";
    } else if (currentWeather === "Moderate or heavy rain shower") {
        weatherIcon.src = "img/rain.png";
    }
    weatherIcon.style.display = 'block';
}




// Function to display error message inside the weather div
function showError(message) {
    const errorMsg = document.getElementById("error-message");
    errorMsg.innerHTML = message;
    document.querySelector('.weather').style.display = 'block'; // Show the weather div to display the error message
}


function clearWeatherInfo() {
    document.getElementById("city").innerHTML = "";
    document.getElementById("time").innerHTML = "";
    document.getElementById("temp").innerHTML = "";
    document.getElementById("huminidity").innerHTML = "";
    document.getElementById("wind").innerHTML = "";
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("weatherIcon").style.display = 'none'; 
    document.querySelector('.weather').style.display = 'none'; 
}


function forecast(location) {
    let forecastDaysDetails = document.getElementById("forecast");
    forecastDaysDetails.innerHTML = ''; 

    fetch(`${forecastUrl}key=${apiKey}&q=${location}&days=3`)
    .then(response => response.json())
    .then(data => {
        const forecastDays = data.forecast.forecastday;
        const title = `<div><h1>Forecast</h1></div>`
        forecastDaysDetails.innerHTML = title;

        forecastDays.forEach(forecastDay => {
            const card = `
                <div class="col-md-4">
                    <div class="card text-center shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${forecastDay.date}</h5>
                            <img src="img/${getIcon(forecastDay.day.condition.text)}" alt="Weather Icon" class="card-img-top weather-icon">
                            <p class="card-text"><strong>${forecastDay.day.condition.text}</strong></p>
                            <p class="card-text">Max Temp: ${forecastDay.day.maxtemp_c}°C</p>
                            <p class="card-text">Min Temp: ${forecastDay.day.mintemp_c}°C</p>
                        </div>
                    </div>
                </div>
            `;
            forecastDaysDetails.innerHTML += card; 
        });
    })
    .catch(error => {
        console.error(error);
    });
}

function getIcon(condition) {
    if (condition === "Clear") return "sun.png";
    if (condition === "Rain") return "rain.png";
    if (condition === "Patchy rain nearby") return "patchlyrain.png";
    if (condition === "Light drizzle") return "Drizzle.png";
    if (condition === "Snow") return "snow.png";
    if (condition === "Mist") return "mist.png";
    if (condition === "Cloudy") return "cloudy.png";
    if (condition === "Partly cloudy") return "cloudy.png";
    if (condition === "Overcast") return "overcast.png";
    if (condition === "Moderate or heavy rain with thunder") return "Heavy-rain-with-thunder.png";
    if (condition === "Light rain shower") return "Light-rain-shower.png";
    if (condition === "Moderate rain") return "patchlyrain.png";
    if (condition === "Patchy light rain with thunder") return "Heavy-rain-with-thunder.png";
    if (condition === "Moderate or heavy rain shower") return "rain.png";
    return "default.png";
}

function getHistoricalWeather() {
    let location = document.getElementById("inputLocation").value;
    let date = document.getElementById("inputDate").value;

    
    if (!location || !date) {
        showError("Please enter both location and date.");
        return;
    }

    let historicalDataDetails = document.getElementById("historicalData");
    historicalDataDetails.innerHTML = ''; 

    fetch(`${historicalDataUrl}key=${apiKey}&q=${location}&dt=${date}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        const historicalDay = data.forecast.forecastday[0];
        console.log(historicalDay)

        const card = `
                <div class="col-lg-12">
                    <div class="card text-center shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${historicalDay.date}</h5>
                            <img src="img/${getIcon(historicalDay.day.condition.text)}" alt="Weather Icon" class="card-img-top weather-icon">
                            <p class="card-text"><strong>${historicalDay.day.condition.text}</strong></p>
                            <p class="card-text">Max Temp:  ${historicalDay.day.maxtemp_c}°C</p>
                            <p class="card-text">Min Temp: ${historicalDay.day.mintemp_c}°C</p>
                            <p class="card-text">Average Temp: ${historicalDay.day.avgtemp_c}°C</p>
                        </div>
                    </div>
                </div>
        `;

        historicalDataDetails.innerHTML += card;
    })
    .catch(error => {
        console.error(error);
    });
}