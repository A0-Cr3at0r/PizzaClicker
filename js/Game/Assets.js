/**
 * Centralized game constants.
 *
 * Contains assets paths, prices, durations,
 * multipliers and default game configuration.
 */

export const Icons = {
    percent: "assets/images/percentBoost.png",
    x2: "assets/images/x2Clicks.jpg",
    x5: "assets/images/x5Clicks.png",
    slicePack: "assets/images/+100Slices.png",
    pizzaPack: "assets/images/+100Pizzas.png",
    autoClicker: "assets/images/AutoCliksWhite.png"
};

export const Prices = {
    percent: 100,
    x2: 500,
    x5: 1500,
    slicePack: 500,
    pizzaPack: 3500,
    autoClicker: 2000
};

//=========================
// Boost Configuration
//=========================

export const Durations = {
    x2: 60,
    x5: 30
};

export const Multipliers = {
    percent: 20,
    x2: 2,
    x5: 5
};

export const AutoClickers = {
    defaultClicksPerSecond: 1
};

//=========================
// Default Pizza
//=========================

export const GameConfig = {
    name: "Standard",
    totalSlices: 8,
    price: 5,
    imageSrc: "assets/images/PizzaGame.png"
    
};

