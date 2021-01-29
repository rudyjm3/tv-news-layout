
function getWeather() {
  let temperature = document.getElementById('temp');
  let shortDescription = document.getElementById('short-weather-description');
  let longDescription = document.getElementById('weather-description')
  let location = document.getElementById('location');
  let tempHigh = document.getElementById('hitemp');
  let tempLow = document.getElementById('lowtemp');

  let weatherIcon = document.getElementById('weather-icon');

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "0e7bd3d49e934934dd7c6b1ae8de86ef";

  location.innerHTML = "Locating...";

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      let url =
        api +
        "?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKey +
        "&units=imperial";

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
//TO GET CURRENT TIME
          let now = new Date();
          let hr = now.getHours();
          let min = now.getMinutes();
          if (min < 10) {
          min = "0" + min;
          }
          let ampm = "am";
          if (hr > 12) {
          hr -= 12;
          ampm = "pm";
          }

          let time = document.getElementById('current-time');
          time.innerText = hr + ":" + min + ampm;

          let temp = data.main.temp;
          temperature.innerText = Math.round(temp) + "°F";

          let iconCode = data.weather[0].icon;
          let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
          weatherIcon.innerHTML = "<img src='" + iconUrl + "'>";


        //  let icon = document.querySelector('.current-weather-box //.temp');
        //  temp.innerHTML = `<span id="weather-icon"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/></span>`;

          tempHigh.innerHTML = "High: " + Math.round(data.main.temp_max) + "°F";
          tempLow.innerHTML = "Low: " + Math.round(data.main.temp_min) + "°F";
          //location.innerHTML =
            //data.name + " (" + latitude + "°, " + longitude + "°)";
            location.innerHTML =
              data.name;
          shortDescription.innerHTML = data.weather[0].main + ":";
          longDescription.innerHTML = data.weather[0].description;
        });
    }

    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  }

  getWeather();
