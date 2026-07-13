const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeButton");
const overlay = document.getElementById("overlay");
const sideMenu = document.getElementById("sideMenu");

menuButton.addEventListener("click", () => {
    overlay.classList.add("show");
    sideMenu.classList.add("open");
});

closeButton.addEventListener("click", () => {
    overlay.classList.remove("show");
    sideMenu.classList.remove("open");
});

overlay.addEventListener("click", () => {
    overlay.classList.remove("show");
    sideMenu.classList.remove("open");
});
