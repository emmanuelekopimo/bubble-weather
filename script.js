const searchBar = document.querySelector('.search-bar')
const dropDown = document.querySelector('.drop-down')

searchBar.onfocus = () => {
    dropDown.style.visibility = 'visible'
}

searchBar.onblur = () => {
    dropDown.style.visibility = 'hidden'
}