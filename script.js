const searchBar = document.querySelector('.search-bar')
const dropDown = document.querySelector('.drop-down')
const currentAction = document.querySelector('.current-action')
const scrollRight = document.querySelector('.scroll-right')
const scrollLeft = document.querySelector('.scroll-left')
const scrollArea = document.querySelector('.scroll-area')

// Weather elements
const currentWeatherIcon = document.querySelector('.current-weather-icon')
const currentTemperature = document.querySelector('.temperature.current')
const detailWind = document.querySelector('.detail.wind')
const detailHumidity = document.querySelector('.detail.humidity')
const detailRain = document.querySelector('.detail.rain')

var lastCity = ''
const gps = {
    latitude: 0,
    longitude: 0
}

// Periodic Updating of weather
const updateWeather = () => {
    if (lastCity.length > 0){
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${gps.latitude}&longitude=${gps.longitude}&hourly=temperature_2m,weathercode&current_weather=true`)
            .then(res => {
                return res.json()
            })
            .then(data =>{
                currentTemperature.innerText = parseFloat(data.current_weather.temperature)
                    .toFixed(0)
                    .toString()
                detailWind.innerText = `${parseFloat(data.current_weather.windspeed)
                    .toFixed(0)
                    .toString()} Km/h `
                console.log(data.current_weather.weathercode)
                switch(data.current_weather.weathercode){
                    case 0:
                        currentWeatherIcon.setAttribute('src', './icons/weather/sun.png')
                        break
                    case 1:
                        currentWeatherIcon.setAttribute('src', './icons/weather/sun.png')
                        break
                    case 2: 
                        currentWeatherIcon.setAttribute('src', './icons/weather/sun-cloud.png.png')
                        break
                    case 3:
                        currentWeatherIcon.setAttribute('src', './icons/weather/cloud.png')
                        break
                    case 45: case 48:
                        currentWeatherIcon.setAttribute('src', './icons/weather/cloud.png')
                        break
                    case 51: case 53: case 55: case 56: case 57: case 61: 
                    case 63: case 65: case 66: case 67:
                        currentWeatherIcon.setAttribute('src', './icons/weather/rain.png')
                        break
                    case 71: case 73: case 75: case	77:
                        currentWeatherIcon.setAttribute('src', './icons/weather/snow.png')
                        break
                    case 80: case 81: case 82:
                        currentWeatherIcon.setAttribute('src', './icons/weather/rain.png')
                        break
                    case 85: case 86:
                        currentWeatherIcon.setAttribute('src', './icons/weather/snow.png')
                        break
                    case 95: case 96: case 99:
                        currentWeatherIcon.setAttribute('src', './icons/weather/storm.png')
                        break
                    default:
                        currentWeatherIcon.setAttribute('src', './icons/weather/sun.png')


                }
            })
    }
}
setInterval (updateWeather, 10000) // Every 10 Seconds

searchBar.spellCheck = false
searchBar.onfocus = () => {
    currentAction.setAttribute('src','./icons/pencil.png')
    dropDown.style.visibility = 'visible'
    if (lastCity.length > 0) {
        dropDown.innerHTML = `<div class="drop-down-item">
        ${lastCity}
        </div>`
    }
    else {
        dropDown.innerHTML = `<div class="drop-down-item">
        Start typing to search for your city
        </div>`
    }  
    dropDown.style.height =  `
        ${document.querySelector('.drop-down-item').offsetHeight}px
        `
    searchBar.value = '' 
}


searchBar.onblur = () => {
    searchBar.value = lastCity
    currentAction.setAttribute('src','./icons/loading.gif')
    setTimeout(() => {
        dropDown.style.visibility = 'hidden'
    }, 150)
    // Update weather here
}

searchBar.oninput = () => {
    // Where search comes in
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchBar.value}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let resultStack =''
            let resultsList = data.results.slice(0,5)
            for (let searchResult of resultsList){
                admin2 = searchResult.admin2===undefined?'':searchResult.admin2+','
                resultStack += `<div class="drop-down-item" lat="${searchResult.latitude}" long="${searchResult.longitude}">
                ${searchResult.name}, ${admin2} ${searchResult.admin1}, ${searchResult.country}
                </div>`
            }
            dropDown.innerHTML = resultStack
                    // Set new height 
            let totalHeight = 0
            
            document.querySelectorAll('.drop-down-item').forEach((element)=>{
                    totalHeight += element.offsetHeight
                    element.onclick = () => {
                        lastCity = element.innerText
                        searchBar.value = lastCity
                        gps.latitude = element.getAttribute('lat')
                        gps.longitude = element.getAttribute('long')
                        updateWeather()
                        // Latency effect to show selected option
                        setTimeout(() => {
                            dropDown.style.visibility = 'hidden'
                        }, 100)
                    }
                })
            dropDown.style.height = `${totalHeight}px`
        })
        .catch(
            err => {
                console.log(err)
            }
        )
    

}



var scrollingRight = false
var scrollingLeft = false
var scrollSpeed = 4

scrollRight.onmouseover = () => {
    scrollingRight = true
}

scrollRight.onmouseout = ()=> {
    scrollingRight = false
}

scrollLeft.onmouseover = () => {
    scrollingLeft = true
}

scrollLeft.onmouseout = ()=> {
    scrollingLeft = false
}

const updateApp = ()=> {
    window.requestAnimationFrame(updateApp)
    if (scrollingRight){
        scrollArea.scrollBy(scrollSpeed,0)
    }
    if (scrollingLeft){
        scrollArea.scrollBy(-scrollSpeed,0)
    }
}
window.requestAnimationFrame(updateApp)