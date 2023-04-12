const searchBar = document.querySelector('.search-bar')
const dropDown = document.querySelector('.drop-down')
const currentAction = document.querySelector('.current-action')
const scrollRight = document.querySelector('.scroll-right')
const scrollLeft = document.querySelector('.scroll-left')
const scrollArea = document.querySelector('.scroll-area')

// Weather elements
const currentWeatherIcon = document.querySelector('.current-weather-icon')

var lastCity = ''
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
    let data = {"results":[{"id":220428,"name":"Akwa","latitude":3.44646,"longitude":29.42378,"elevation":800.0,"feature_code":"PPL","country_code":"CD","admin1_id":216140,"admin2_id":12278089,"timezone":"Africa/Lubumbashi","country_id":203312,"country":"DR Congo","admin1":"Haut-Uele","admin2":"Faradje"},{"id":2235749,"name":"Akwa","latitude":5.3519,"longitude":8.9356,"elevation":286.0,"feature_code":"PPL","country_code":"CM","admin1_id":2221788,"timezone":"Africa/Douala","country_id":2233387,"country":"Cameroon","admin1":"South-West"},{"id":2350821,"name":"Akwa","latitude":5.91172,"longitude":7.01132,"elevation":60.0,"feature_code":"PPL","country_code":"NG","admin1_id":2349961,"admin2_id":7701534,"timezone":"Africa/Lagos","country_id":2328926,"country":"Nigeria","admin1":"Anambra","admin2":"Nnewi South"},{"id":2350822,"name":"Akwa","latitude":5.0292,"longitude":7.15748,"elevation":36.0,"feature_code":"PPL","country_code":"NG","admin1_id":2324433,"admin2_id":7701519,"timezone":"Africa/Lagos","country_id":2328926,"country":"Nigeria","admin1":"Rivers State","admin2":"Etche"},{"id":6855199,"name":"Akwa","latitude":6.05348,"longitude":9.47493,"elevation":133.0,"feature_code":"PPL","country_code":"CM","admin1_id":2221788,"timezone":"Africa/Douala","country_id":2233387,"country":"Cameroon","admin1":"South-West"},{"id":10814485,"name":"Akwa","latitude":29.83626,"longitude":79.65391,"elevation":2097.0,"feature_code":"PPL","country_code":"IN","admin1_id":1444366,"admin2_id":7701513,"timezone":"Asia/Kolkata","country_id":1269750,"country":"India","admin1":"Uttarakhand","admin2":"Bageshwar"},{"id":2235748,"name":"Akwa","latitude":4.05,"longitude":9.7,"elevation":18.0,"feature_code":"PPLX","country_code":"CM","admin1_id":2229336,"timezone":"Africa/Douala","country_id":2233387,"country":"Cameroon","admin1":"Littoral"},{"id":379761,"name":"Akwat","latitude":9.051,"longitude":32.41661,"elevation":400.0,"feature_code":"PPL","country_code":"SS","admin1_id":381229,"timezone":"Africa/Juba","country_id":7909807,"country":"South Sudan","admin1":"Upper Nile State"},{"id":379774,"name":"Akwar","latitude":9.1006,"longitude":26.72356,"elevation":456.0,"feature_code":"PPL","country_code":"SS","admin1_id":408665,"timezone":"Africa/Juba","country_id":7909807,"country":"South Sudan","admin1":"Northern Bahr al Ghazal"},{"id":379776,"name":"Akwaj","latitude":10.3868,"longitude":32.61437,"elevation":390.0,"feature_code":"PPL","country_code":"SS","admin1_id":381229,"timezone":"Africa/Juba","country_id":7909807,"country":"South Sudan","admin1":"Upper Nile State"}],"generationtime_ms":0.3979206}
    let resultStack =''
    let resultsList = data.results.slice(0,5)
    for (let searchResult of resultsList){
        admin2 = searchResult.admin2===undefined?'':searchResult.admin2+','
        resultStack += `<div class="drop-down-item">
        ${searchResult.name}, ${admin2} ${searchResult.admin1}, ${searchResult.country}
        </div>`
    }
    

    dropDown.innerHTML = resultStack
    let totalHeight = 0
    
    document.querySelectorAll('.drop-down-item').forEach((element)=>{
            totalHeight += element.offsetHeight
            element.onclick = () => {
                lastCity = element.innerText
                searchBar.value = lastCity
                // Latency effect to show selected option
                setTimeout(() => {
                    dropDown.style.visibility = 'hidden'
                }, 100)
            }
        })
    dropDown.style.height = `${totalHeight}px`

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