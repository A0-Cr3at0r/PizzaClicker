import { Game } from "./GameClass.js";

import {
    Icons,
    Prices,
    Durations,
    Multipliers,
    AutoClickers,
    Economy,
    GameConfig
} from "./Assets.js";

import { PizzaUI } from "../UI/PizzaUI.js";
import MetricUI from "../UI/MetricUI.js";
import BoostUI from "../UI/BoostUI.js";

import { AudioManager } from "../Managers/AudioManager.js";
import MetricManager from "../Managers/MetricManager.js";
import BoostManager from "../Managers/BoostsManager.js";
import Wallet from "../Wallet/Wallet.js";

import TotalClicks from "../Metrics/TotalClicks.js";
import TotalSlices from "../Metrics/TotalSlices.js";
import ClicksPerSecond from "../Metrics/ClicksPerSecond.js";
import SlicesPerSecond from "../Metrics/SlicesPerSecond.js";
import PizzasPerSecond from "../Metrics/PizzasPerSecond.js";

import PercentBoost from "../Boosts/ModifierBoosts/PercentBoost.js";
import MultiplierBoost from "../Boosts/ModifierBoosts/MultiplierBoost.js";
import SlicePackBoost from "../Boosts/InstantBoosts/SlicePackBoosts.js";
import PizzaPackBoost from "../Boosts/InstantBoosts/PizzaPackBoost.js";
import AutoClickerBoost from "../Boosts/ActiveBoosts/AutoClicker.js";

import { BoostAction } from "../Boosts/BoostAction.js";

//-----------------------------------------------------
// Game
//-----------------------------------------------------

const game = new Game(
    0,
    GameConfig.totalSlices
);

//-----------------------------------------------------
// Managers
//-----------------------------------------------------

const wallet = new Wallet();

const metricManager = new MetricManager();

const boostManager = new BoostManager(wallet);

const audioManager = new AudioManager();

//-----------------------------------------------------
// Metrics
//-----------------------------------------------------

metricManager.addMetric(new TotalClicks());
metricManager.addMetric(new TotalSlices());
metricManager.addMetric(new ClicksPerSecond());
metricManager.addMetric(new SlicesPerSecond());
metricManager.addMetric(new PizzasPerSecond());

//-----------------------------------------------------
// Boost registration
//-----------------------------------------------------

boostManager.register(
    new PercentBoost(
        "+20% Revenue",
        Prices.percent,
        Icons.percent,
        "Increase all revenues by 20%",
        Multipliers.percent
    )
);

boostManager.register(
    new MultiplierBoost(
        "x2 Revenue",
        Prices.x2,
        Icons.x2,
        "Double your revenue for 60 seconds",
        Multipliers.x2,
        Durations.x2
    )
);

boostManager.register(
    new MultiplierBoost(
        "x5 Revenue",
        Prices.x5,
        Icons.x5,
        "Multiply your revenue by 5 for 30 seconds",
        Multipliers.x5,
        Durations.x5
    )
);

boostManager.register(
    new SlicePackBoost(
        Icons.slicePack
    )
);

boostManager.register(
    new PizzaPackBoost(
        Icons.pizzaPack
    )
);

boostManager.register(
    new AutoClickerBoost(
        Icons.autoClicker,
        AutoClickers.defaultClicksPerSecond
    )
);

//-----------------------------------------------------
// UI
//-----------------------------------------------------

const pizzaCanvas = document.getElementById("pizzaCanvas");

const pizzaUI = new PizzaUI(pizzaCanvas);
const metricUI = new MetricUI();
const boostUI = new BoostUI(boostManager, wallet, game);

pizzaUI.update(game);
metricUI.render(metricManager);
boostUI.render(wallet);

//-----------------------------------------------------
// Inputs
//-----------------------------------------------------

document
    .getElementById("pizzaCanvas")
    .addEventListener("click", performClick);

document
    .getElementById("cookButton")
    .addEventListener("click", performClick);

//-----------------------------------------------------
// Game actions
//-----------------------------------------------------

function performClick() {

    const result = game.cook();

    metricManager.recordClick();

    if (result.sliceSold) {

        metricManager.recordSlice(result.slicesSold);

        const gain = boostManager.computeGain(
            result.slicesSold * Economy.sliceValue
        );

        wallet.add(gain);

        audioManager.click();

    }

    if (result.pizzaCooked) {

        metricManager.recordPizza();

        audioManager.cook();

    }

    pizzaUI.update(game);
    pizzaUI.pizzaClickAnimation();

    metricUI.render(metricManager);
    boostUI.render(wallet);

}

//-----------------------------------------------------
// Main loop
//-----------------------------------------------------

let previousTime = performance.now();

requestAnimationFrame(gameLoop);

function gameLoop(currentTime) {

    const deltaTime = (currentTime - previousTime) / 1000;

    previousTime = currentTime;

    metricManager.update(deltaTime);

    const actions = boostManager.update(deltaTime);

    for (const action of actions) {

        switch (action.type) {

            case BoostAction.AUTO_CLICK:

                for (let i = 0; i < action.count; i++) {
                    performClick();
                }

                break;
        }

    }

    metricUI.render(metricManager);
    boostUI.render(wallet);

    requestAnimationFrame(gameLoop);

}