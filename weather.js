const button = document.getElementById("btn");
const input = document.querySelector("input");
const temperatureDiv = document.querySelector(".temprature");
const weatherDetailsDiv = document.querySelector(".weatherDetails");

button.addEventListener("click", function (e) {
  e.preventDefault();

  const city = input.value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  const APIkey = "401778488c378449a074cf1e4096290d"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then((data) => {
      const temp = data.main.temp;
      const description = data.weather.description;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;



      temperatureDiv.innerHTML = ` Temperature: ${temp} Celsius`;
      weatherDetailsDiv.innerHTML = `
        <p>Weather: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${wind} m/s</p>`;
    })
    .catch((error) => {
      temperatureDiv.innerHTML = "";
      weatherDetailsDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});
