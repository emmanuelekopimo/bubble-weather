// Elements
const main = document.querySelector(".main");
const locationBar = document.querySelector(".location-bar");
const temperature = document.querySelector(".temperature");
const temperatureContainer = document.querySelector(".temperature-container");

const resize = () => {
  main.style.width = `${innerWidth - 50}px`;
  main.style.height = `${innerHeight - 130}px`;

  if (innerWidth <= 420) {
    main.style.width = `${innerWidth - 36}px`;
    main.style.height = `${innerHeight - 180}px`;
    locationBar.style.width = `${innerWidth - 34}px`;
  }
};

// All things that happen on resize
window.addEventListener("resize", resize);
resize();
