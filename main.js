// Dark/Light Mode
const body = document.querySelector("body");
const modeToggle = document.getElementById("icon");
const modeIcon = document.querySelector(".icon ion-icon");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
  modeChecker();
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  modeChecker();
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

function modeChecker() {
  if (body.classList.contains("dark")) {
    modeIcon.setAttribute("name", "sunny-outline");
  } else {
    modeIcon.setAttribute("name", "moon-outline");
  }
}
