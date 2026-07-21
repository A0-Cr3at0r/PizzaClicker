/**
 * Application entry point.
 *
 * Responsible for initializing the game,
 * creating managers, connecting UI components
 * and starting the main game loop.
 *
 * Contains no gameplay logic.
 */


// Cores
import { Game } from "./GameClass.js";

import Pizza from "../Pizza/Pizza.js";

import {
    Icons,
    Prices,
    Durations,
    Multipliers,
    AutoClickers,
    GameConfig
} from "./Assets.js";


// UI
import { PizzaUI } from "../UI/PizzaUI.js";
import MetricUI from "../UI/MetricUI.js";
import BoostUI from "../UI/BoostUI.js";
import UIManager from "../Managers/UIMangers.js";
import SettingsUI from "../UI/SettingsUI.js";


// Managers
import { AudioManager } from "../Managers/AudioManager.js";
import MetricManager from "../Managers/MetricManager.js";
import BoostManager from "../Managers/BoostsManager.js";
import ClickManager from "../Managers/ClickManager.js";
import SaveManager from "../Managers/SaveManager.js";
import ThemeManager from "../Managers/ThemeManager.js";
import SkinManager from "../Managers/SkinManager.js";
import SettingsManager from "../Managers/SettingsManagers.js";


// Wallet
import Wallet from "../Wallet/Wallet.js";


// Metrics
import TotalClicks from "../Metrics/TotalClicks.js";
import TotalSlices from "../Metrics/TotalSlices.js";
import ClicksPerSecond from "../Metrics/ClicksPerSecond.js";
import SlicesPerSecond from "../Metrics/SlicesPerSecond.js";
import PizzasPerSecond from "../Metrics/PizzasPerSecond.js";
import SliceMultiplier from "../Metrics/SlicesMultiplier.js";
import MoneyMultiplier from "../Metrics/MoneyMultiplier.js";


// Boosts
import { GameEvent } from "./GameEvents.js";

import BoostFactory from "../Boosts/BoostFactory.js";


//-----------------------------------------------------
// Game Initialization
//
// Creates the core game instance and its initial pizza.
//-----------------------------------------------------


const currentPizza =
    new Pizza(
        GameConfig.name,
        GameConfig.totalSlices,
        GameConfig.price,
        GameConfig.imageSrc
    );



const game =
    new Game(0,
        currentPizza
    );


const pizzaUI =
    new PizzaUI(
        document.getElementById("pizzaCanvas"),
    );

//-----------------------------------------------------
// Managers
//
// Creates services responsible for game orchestration,
// persistence, audio, settings and external systems.
//-----------------------------------------------------


const wallet = new Wallet(10000, currentPizza.getPrice());


const metricManager =  new MetricManager();


const boostManager = new BoostManager();


const clickManager =
    new ClickManager(
        game,
        wallet,
        boostManager,
        metricManager
    );


const audioManager = new AudioManager();

audioManager.playBackgroundMusic();


const themeManager = new ThemeManager();


const skinManager = new SkinManager();


const settingsManager =
    new SettingsManager(
        audioManager,
        themeManager,
        skinManager,
        pizzaUI
    );


const saveManager =
    new SaveManager(
        game,
        wallet,
        boostManager,
        metricManager,
    );

//-----------------------------------------------------
// Persistence
//-----------------------------------------------------

let allowSave = true;

window.addEventListener(
        "beforeunload",
        () => {

            if(allowSave) {
                saveManager.save();
            }

        }
    );


//-----------------------------------------------------
// Metrics
//-----------------------------------------------------


metricManager.addMetric( new TotalClicks() );


metricManager.addMetric( new TotalSlices() );


metricManager.addMetric( new ClicksPerSecond() );


metricManager.addMetric( new SlicesPerSecond() );


metricManager.addMetric( new PizzasPerSecond() );


metricManager.addMetric( new SliceMultiplier() );


metricManager.addMetric( new MoneyMultiplier() );

//-----------------------------------------------------
// Boost registration
//-----------------------------------------------------

const boosts = [
    BoostFactory.createMoneyBoost,
    BoostFactory.createX2Boost,
    BoostFactory.createX5Boost,
    BoostFactory.createSlicePack,
    BoostFactory.createPizzaPack,
    BoostFactory.createAutoClicker
];

//-----------------------------------------------------
// UI
//-----------------------------------------------------


const metricUI = new MetricUI();


const boostUI =
    new BoostUI(
        boosts,
        purchaseBoost
    );

    boostUI.render(wallet.balance());


const uiManager =
    new UIManager(
        pizzaUI,
        metricUI,
        boostUI
    );


const settingsUi = new SettingsUI( settingsManager );

//-----------------------------------------------------
// User inputs
//-----------------------------------------------------


document
    .getElementById("pizzaCanvas")
    .addEventListener(
        "click",
        performClick
    );

document
    .getElementById("cookButton")
    .addEventListener(
        "click",
        performClick
    );

document
    .getElementById("resetButton")
    .addEventListener(
        "click",
        () => {

            if(confirm("Reset all progress?")) {

                allowSave = false;

                saveManager.reset();
                settingsManager.reset();

                location.reload();
            }
        }
    );

document.addEventListener(
    "pointerdown",
    () => { audioManager.playBackgroundMusic(); },
    { once: true }
);

//-----------------------------------------------------
// Gameplay actions
//-----------------------------------------------------

/**
 * Handles player click actions.
 *
 * Sends the action to the game controller
 * and propagates the result to external systems.
 */

function performClick() {

    const result = clickManager.click(1);

    uiManager.consumeGameResult( result );

    audioManager.consumeGameResult( result );
}


/**
 * Handles boost purchasing workflow.
 *
 * Creates the boost instance, validates the purchase
 * and updates dependent systems.
 */

function purchaseBoost(createBoost) {

    const boost = createBoost();

    const result = clickManager.buy(boost);

    uiManager.consumeGameResult(result);

    audioManager.consumeGameResult(result);

    return true;
}


//-----------------------------------------------------
// Main loop
//-----------------------------------------------------


let previousTime =
    performance.now();

saveManager.load();

settingsManager.load();

settingsManager.apply();

requestAnimationFrame( gameLoop );

/**
 * Main game loop.
 *
 * Updates time-dependent systems and refreshes
 * the game state every animation frame.
 */

function gameLoop(currentTime) {

    const deltaTime = (currentTime - previousTime) / 1000;

    previousTime = currentTime;

    metricManager.update( deltaTime );

    boostManager.setDeltaTime( deltaTime );

    const result = clickManager.click();

    audioManager.consumeGameResult( result );

    uiManager.consumeGameResult( result );

    requestAnimationFrame( gameLoop );
}

