/*
    Menu UI Controller

    Handles the side menu interactions:
    - Opening the menu
    - Closing the menu
    - Closing the menu through overlay click

    This module only manages DOM interactions.
    It does not contain application logic.
*/

const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeButton");
const overlay = document.getElementById("overlay");
const sideMenu = document.getElementById("sideMenu");

//=========================
// Menu Open / Close
//=========================

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
