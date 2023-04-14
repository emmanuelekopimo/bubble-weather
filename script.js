const searchBar = document.querySelector(".search-bar");
const dropDown = document.querySelector(".drop-down");
const currentAction = document.querySelector(".current-action");
const scrollRight = document.querySelector(".scroll-right");
const scrollLeft = document.querySelector(".scroll-left");
const scrollArea = document.querySelector(".scroll-area");

// Weather DOM elements
const dateTime = document.querySelector(".date-display");
const currentWeatherIcon = document.querySelector(".current-weather-icon");
const currentTemperature = document.querySelector(".temperature.current");
const detailWind = document.querySelector(".detail.wind");
const detailTemperature = document.querySelector(".detail.temperature-range");
const detailRain = document.querySelector(".detail.rain");
const detailDayName = document.querySelectorAll(".week-day");
const detailDayNameMobile = document.querySelectorAll(".week-day-mobile");
const detailDayTemp = document.querySelectorAll(".day-temperature");
const detailDayTempMobile = document.querySelectorAll(
  ".day-temperature-mobile"
);
const detailWeeklyIcon = document.querySelectorAll(".icon-weather.weekly");
const detailWeeklyIconMobile = document.querySelectorAll(
  ".icon-weather-mobile.weekly"
);
const detailHourlyIcon = document.querySelectorAll(".icon-weather.hourly");
const hourTime = document.querySelectorAll(".hour-time");
const hourTemp = document.querySelectorAll(".hour-temperature");
const hourIcon = document.querySelectorAll(".icon-weather.hourly");

// Set main variables
var lastCity = "";
const gps = {
  latitude: 0,
  longitude: 0,
};

// test for previous data and actuallu get it
if (localStorage.getItem("test") === "true") {
  lastCity = localStorage.getItem("city");
  gps.latitude = localStorage.getItem("latitude");
  gps.longitude = localStorage.getItem("longitude");
  console.log(gps);
  searchBar.value = lastCity;
}

// Periodic Updating of weather
const updateWeather = () => {
  if (lastCity.length > 0) {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${gps.latitude}&longitude=${gps.longitude}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max&current_weather=true&timezone=auto`
    )
      //fetch('http://127.0.0.1:5501/api/current-weather.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // set local time
        currentTime = new Date(data.current_weather.time);
        let hourNow = "";
        if (currentTime.getHours() === 0) {
          hourNow = "12:00 AM";
        } else if (currentTime.getHours() === 12) {
          hourNow = "12:00 PM";
        } else if (currentTime.getHours() < 12) {
          hourNow = `${date.getHours().toString().padStart(2, "0")}:00 AM`;
        } else {
          hourNow = `${(date.getHours() - 12)
            .toString()
            .padStart(2, "0")}:00 PM`;
        }
        dateTime.innerText = `Weather for ${currentTime.toDateString()} ${hourNow}`;
        currentTemperature.innerText = Math.round(
          parseFloat(data.current_weather.temperature)
        ).toString();
        detailWind.innerText = `${Math.round(
          parseFloat(data.current_weather.windspeed)
        ).toString()} Km/h `;
        detailRain.innerText = `${Math.round(
          parseFloat(data.daily.precipitation_probability_max[0])
        ).toString()} %`;
        detailTemperature.innerHTML = `
                    ${parseFloat(
                      Math.round(data.daily.apparent_temperature_min[0])
                    ).toString()}
                        <sup class="detail">৹</sup> / 
                    ${parseFloat(
                      Math.round(data.daily.apparent_temperature_max[0])
                    ).toString()}
                        <sup class="detail">৹</sup>`;

        let isDay = data.current_weather.is_day === 1 ? true : false;
        switch (data.current_weather.weathercode) {
          case 0:
          case 1:
            currentWeatherIcon.setAttribute(
              "src",
              isDay ? "./icons/weather/sun.png" : "./icons/weather/moon.png"
            );
            break;
          case 2:
            currentWeatherIcon.setAttribute(
              "src",
              isDay
                ? "./icons/weather/sun-cloud.png"
                : "./icons/weather/cloud-moon.png"
            );
            break;
          case 3:
            currentWeatherIcon.setAttribute(
              "src",
              isDay
                ? "./icons/weather/cloud.png"
                : "./icons/weather/cloud-moon.png"
            );
            break;
          case 45:
          case 48:
            currentWeatherIcon.setAttribute(
              "src",
              isDay
                ? "./icons/weather/cloud.png"
                : "./icons/weather/cloud-moon.png"
            );
            break;
          case 51:
          case 53:
          case 55:
          case 56:
          case 57:
          case 61:
          case 63:
          case 65:
          case 66:
          case 67:
            currentWeatherIcon.setAttribute("src", "./icons/weather/rain.png");
            break;
          case 71:
          case 73:
          case 75:
          case 77:
            currentWeatherIcon.setAttribute("src", "./icons/weather/snow.png");
            break;
          case 80:
          case 81:
          case 82:
            currentWeatherIcon.setAttribute("src", "./icons/weather/rain.png");
            break;
          case 85:
          case 86:
            currentWeatherIcon.setAttribute("src", "./icons/weather/snow.png");
            break;
          case 95:
          case 96:
          case 99:
            currentWeatherIcon.setAttribute("src", "./icons/weather/storm.png");
            break;
          default:
            currentWeatherIcon.setAttribute(
              "src",
              isDay ? "./icons/weather/sun.png" : "./icons/weather/moon.png"
            );
        }

        let daysName = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let days = data.daily.time;
        days.shift();
        let daysCode = data.daily.weathercode;
        daysCode.shift();
        let daysTemp = data.daily.temperature_2m_max;
        daysTemp.shift();
        let count = 0;
        for (let day of days) {
          let date = new Date(day);
          let dayName = daysName[date.getDay()];
          let dayCode = daysCode[count];
          let dayTemp = Math.round(daysTemp[count]).toString();
          detailDayName[count].innerText = dayName;
          detailDayNameMobile[count].innerText = dayName;
          detailDayTemp[
            count
          ].innerHTML = `${dayTemp} <sup class="detail">৹</sup> C`;
          detailDayTempMobile[
            count
          ].innerHTML = `${dayTemp} <sup class="detail dark">৹</sup> C`;
          switch (dayCode) {
            case 0:
            case 1:
              detailWeeklyIcon[count].setAttribute(
                "src",
                "./icons/weather/sun.png"
              );
              detailWeeklyIconMobile[count].setAttribute(
                "src",
                "./icons/weather/sun.png"
              );
              break;
            case 2:
              detailWeeklyIcon[count].setAttribute(
                "src",
                "./icons/weather/sun.png"
              );
              detailWeeklyIconMobile[count].setAttribute(
                "src",
                "./icons/weather/sun.png"
              );
              break;
            case 3:
              detailWeeklyIcon[count].setAttribute(
                "src",
                "./icons/weather/sun.png"
              );
              detailWeeklyIconMobile[count].setAttribute(
                "src",
                "./icons/weather/sun.png"
              );
              break;
            case 45:
            case 48:
              detailWeeklyIcon[count].setAttribute(
                "src",
                "./icons/weather/sun.png"
              );
              detailWeeklyIconMobile[count].setAttribute(
                "src",
                "./icons/weather/sun.png"
              );
              break;
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
              detailWeeklyIcon[count].setAttribute(
                "src",
                "./icons/weather/rain.png"
              );
              detailWeeklyIconMobile[count].setAttribute(
                "src",
                "./icons/weather/rain.png"
              );
              break;
            case 71:
            case 73:
            case 75:
            case 77:
              detailWeeklyIcon[count].setAttribute(
                "src",
                "./icons/weather/snow.png"
              );
              detailWeeklyIconMobile[count].setAttribute(
                "src",
                "./icons/weather/snow.png"
              );
              break;
            case 80:
            case 81:
            case 82:
              detailWeeklyIcon[count].setAttribute(
                "src",
                "./icons/weather/rain.png"
              );
              detailWeeklyIconMobile[count].setAttribute(
                "src",
                "./icons/weather/rain.png"
              );
              break;
            case 85:
            case 86:
              detailWeeklyIcon[count].setAttribute(
                "src",
                "./icons/weather/snow.png"
              );
              detailWeeklyIconMobile[count].setAttribute(
                "src",
                "./icons/weather/snow.png"
              );
              break;
            case 95:
            case 96:
            case 99:
              detailWeeklyIcon[count].setAttribute(
                "src",
                "./icons/weather/storm.png"
              );
              detailWeeklyIconMobile[count].setAttribute(
                "src",
                "./icons/weather/storm.png"
              );
              break;
            default:
              detailWeeklyIcon[count].setAttribute(
                "src",
                "./icons/weather/sun.png"
              );
              detailWeeklyIconMobile[count].setAttribute(
                "src",
                "./icons/weather/sun.png"
              );
          }

          count += 1;
        }

        // Hourly weather
        let startTime = data.hourly.time.indexOf(data.current_weather.time);
        let hours = data.hourly.time.slice(startTime, startTime + 24);
        let hoursTemp = data.hourly.temperature_2m.slice(
          startTime,
          startTime + 24
        );
        let hoursCode = data.hourly.weathercode.slice(
          startTime,
          startTime + 24
        );
        count = 0;
        for (let hour of hours) {
          let date = new Date(hour);
          let isDay = date.getHours() > 5 && date.getHours() < 20;
          if (date.getHours() === 0) {
            hourTime[count].innerText = "12:00 AM";
          } else if (date.getHours() === 12) {
            hourTime[count].innerText = "12:00 PM";
          } else if (date.getHours() < 12) {
            hourTime[count].innerText = `${date
              .getHours()
              .toString()
              .padStart(2, "0")}:00 AM`;
          } else {
            hourTime[count].innerText = `${(date.getHours() - 12)
              .toString()
              .padStart(2, "0")}:00 PM`;
          }
          hourTemp[count].innerHTML = `${Math.round(
            hoursTemp[count]
          )} <sup class="detail dark">৹</sup> C`;

          switch (hoursCode[count]) {
            case 0:
            case 1:
              hourIcon[count].setAttribute(
                "src",
                isDay ? "./icons/weather/sun.png" : "./icons/weather/moon.png"
              );
              break;
            case 2:
              hourIcon[count].setAttribute(
                "src",
                isDay
                  ? "./icons/weather/sun-cloud.png"
                  : "./icons/weather/cloud-moon.png"
              );
              break;
            case 3:
              hourIcon[count].setAttribute(
                "src",
                isDay
                  ? "./icons/weather/cloud.png"
                  : "./icons/weather/cloud-moon.png"
              );
              break;
            case 45:
            case 48:
              hourIcon[count].setAttribute(
                "src",
                isDay
                  ? "./icons/weather/cloud.png"
                  : "./icons/weather/cloud-moon.png"
              );
              break;
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
              hourIcon[count].setAttribute("src", "./icons/weather/rain.png");
              break;
            case 71:
            case 73:
            case 75:
            case 77:
              hourIcon[count].setAttribute("src", "./icons/weather/snow.png");
              break;
            case 80:
            case 81:
            case 82:
              hourIcon[count].setAttribute("src", "./icons/weather/rain.png");
              break;
            case 85:
            case 86:
              hourIcon[count].setAttribute("src", "./icons/weather/snow.png");
              break;
            case 95:
            case 96:
            case 99:
              hourIcon[count].setAttribute("src", "./icons/weather/storm.png");
              break;
            default:
              hourIcon[count].setAttribute(
                "src",
                isDay ? "./icons/weather/sun.png" : "./icons/weather/moon.png"
              );
          }
          count += 1;
        }
        currentAction.setAttribute("src", "./icons/check.png");
      })
      .catch((err) => {
        currentAction.setAttribute("src", "./icons/loading.gif");
      });
  }
};
setInterval(updateWeather, 5000); // Every 3 Seconds

searchBar.spellCheck = false;
searchBar.onfocus = () => {
  currentAction.setAttribute("src", "./icons/pencil.png");
  dropDown.style.visibility = "visible";
  if (lastCity.length > 0) {
    dropDown.innerHTML = `<div class="drop-down-item">
        ${lastCity}
        </div>`;
  } else {
    dropDown.innerHTML = `<div class="drop-down-item">
        Start typing to search for your city
        </div>`;
  }
  dropDown.style.height = `
        ${document.querySelector(".drop-down-item").offsetHeight}px
        `;
  searchBar.value = "";
};

searchBar.onblur = () => {
  searchBar.value = lastCity;
  currentAction.setAttribute("src", "./icons/loading.gif");
  updateWeather();
  setTimeout(() => {
    dropDown.style.visibility = "hidden";
  }, 150);
};

searchBar.oninput = () => {
  // Where city search comes in
  if (searchBar.value.length > 0) {
    // Check API and parse JSON
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchBar.value}`
    )
      //fetch('http://127.0.0.1:5501/api/city.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let resultStack = "";
        let resultsList = data.results.slice(0, 5);
        for (let searchResult of resultsList) {
          admin2 =
            searchResult.admin2 === undefined ? "" : searchResult.admin2 + ",";
          resultStack += `<div class="drop-down-item" lat="${searchResult.latitude}" long="${searchResult.longitude}">
                    ${searchResult.name}, ${admin2} ${searchResult.admin1}, ${searchResult.country}
                    </div>`;
        }
        dropDown.innerHTML = resultStack;
        // Set new height for the drop down menu
        let totalHeight = 0;

        document.querySelectorAll(".drop-down-item").forEach((element) => {
          totalHeight += element.offsetHeight;
          element.onclick = () => {
            lastCity = element.innerText;
            searchBar.value = lastCity;
            gps.latitude = element.getAttribute("lat");
            gps.longitude = element.getAttribute("long");
            localStorage.setItem("latitude", gps.latitude.toString());
            localStorage.setItem("longitude", gps.longitude.toString());
            localStorage.setItem("city", lastCity);
            localStorage.setItem("test", "true");
            currentAction.setAttribute("src", "./icons/loading.gif");
            updateWeather();
            // Latency effect to show selected option
            setTimeout(() => {
              dropDown.style.visibility = "hidden";
            }, 100);
          };
        });
        dropDown.style.height = `${totalHeight}px`;
      })
      .catch(
        // Handle error appropriately
        (err) => {
          console.error(err);
          dropDown.innerHTML = `<div class="drop-down-item">
                    No search results for "${searchBar.value}"
                    </div>`;
          dropDown.style.height = `${
            document.querySelector(".drop-down-item").offsetHeight
          }px`;
        }
      );
  } else {
    dropDown.innerHTML = `<div class="drop-down-item">
        Start typing to search for your city
        </div>`;
    dropDown.style.height = `${
      document.querySelector(".drop-down-item").offsetHeight
    }px`;
  }
};

var scrollingRight = false;
var scrollingLeft = false;
var scrollSpeed = 4;

// Handle hover events for the buttons
scrollRight.onmouseover = () => {
  scrollingRight = true;
};

scrollRight.onmouseout = () => {
  scrollingRight = false;
};

scrollLeft.onmouseover = () => {
  scrollingLeft = true;
};

scrollLeft.onmouseout = () => {
  scrollingLeft = false;
};

const updateApp = () => {
  window.requestAnimationFrame(updateApp);
  if (scrollingRight) {
    scrollArea.scrollBy(scrollSpeed, 0);
  }
  if (scrollingLeft) {
    scrollArea.scrollBy(-scrollSpeed, 0);
  }
};
window.requestAnimationFrame(updateApp);
