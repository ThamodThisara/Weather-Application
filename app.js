const apiKey = "e5964b4ef51d4a5dbc2190433242809";
const apiUrl = "https://api.weatherapi.com/v1/current.json?";
 

document.getElementById("btn-Search").addEventListener("click",btnSearch)

function btnSearch() {
    let location = document.getElementById("inputLocation").value;

    // Hide previous weather info and error message
    clearWeatherInfo();

    if (!location) {
        // If the input is empty, show an error
        showError('Please enter a location.');
        return;
    }

    fetch(`${apiUrl}key=${apiKey}&q=${location}`)
    .then(response => {
        if (!response.ok) {
            // If the response is not OK, throw an error
            throw new Error('Invalid location');
        }
        return response.json();
        })
        .then(data => {
            // Clear any previous error messages
            document.getElementById("error-message").innerHTML = '';

            // Update weather information
            console.log(data);
            document.getElementById("city").innerHTML = data.location.name;
            document.getElementById("time").innerHTML = data.location.localtime;
            document.getElementById("temp").innerHTML = Math.round(data.current.temp_c) + "°C";
            document.getElementById("huminidity").innerHTML = data.current.humidity + "%";
            document.getElementById("wind").innerHTML = data.current.wind_kph + "Km/h";

            let currentWeather = data.current.condition.text;
            
            // Show the weather div after data is fetched
            document.querySelector('.weather').style.display = 'block';
            console.log (currentWeather);

            // Update the weather icon based on the current weather condition
            updateWeatherIcon(currentWeather);

        })

        .catch(error => {
            // Show the error message inside the weather div
            showError('Location not found. Please enter a valid location.');
            console.error(error);
        });
}

// Function to update weather icon
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
    }
    weatherIcon.style.display = 'block';
}

// Function to display error message inside the weather div
function showError(message) {
    const errorMsg = document.getElementById("error-message");
    errorMsg.innerHTML = message;
    document.querySelector('.weather').style.display = 'block'; // Show the weather div to display the error message
}

// Function to clear previous weather info and error message
function clearWeatherInfo() {
    document.getElementById("city").innerHTML = "";
    document.getElementById("time").innerHTML = "";
    document.getElementById("temp").innerHTML = "";
    document.getElementById("huminidity").innerHTML = "";
    document.getElementById("wind").innerHTML = "";
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("weatherIcon").style.display = 'none'; // Hide the weather icon initially
    document.querySelector('.weather').style.display = 'none'; // Hide the weather div initially
}





