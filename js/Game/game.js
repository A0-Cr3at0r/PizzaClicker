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


// Managers
import { AudioManager } from "../Managers/AudioManager.js";
import MetricManager from "../Managers/MetricManager.js";
import BoostManager from "../Managers/BoostsManager.js";
import ClickManager from "../Managers/ClickManager.js";
import SaveManager from "../Managers/SaveManager.js";


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
import MoneyBoost from "../Boosts/ModifierBoosts/MoneyBoost.js";
import SlicesBoost from "../Boosts/ModifierBoosts/SlicesBoost.js";

import SlicePackBoost from "../Boosts/InstantBoosts/SlicePackBoosts.js";
import PizzaPackBoost from "../Boosts/InstantBoosts/PizzaPackBoost.js";

import AutoClickerBoost from "../Boosts/ActiveBoosts/AutoClicker.js";
import { GameEvent } from "./GameEvents.js";



//-----------------------------------------------------
// Game
//-----------------------------------------------------


const currentPizza =
    new Pizza(
        GameConfig.name,
        GameConfig.totalSlices,
        GameConfig.price,
        GameConfig.imageSrc
    );



const game =
    new Game(
        0,
        currentPizza
    );



//-----------------------------------------------------
// Managers
//-----------------------------------------------------


const wallet =
    new Wallet(10000, currentPizza.getPrice());



const metricManager =
    new MetricManager();



const boostManager =
    new BoostManager();



const clickManager =
    new ClickManager(
        game,
        wallet,
        boostManager,
        metricManager
    );



const audioManager =
    new AudioManager();



const saveManager =
    new SaveManager(
        game,
        wallet,
        boostManager,
        metricManager
    );

window.addEventListener(
    "beforeunload",
    () => {
        saveManager.save();
    }
    );


//-----------------------------------------------------
// Metrics
//-----------------------------------------------------


metricManager.addMetric(
    new TotalClicks()
);


metricManager.addMetric(
    new TotalSlices()
);


metricManager.addMetric(
    new ClicksPerSecond()
);


metricManager.addMetric(
    new SlicesPerSecond()
);


metricManager.addMetric(
    new PizzasPerSecond()
);

metricManager.addMetric(
    new SliceMultiplier()
);

metricManager.addMetric(
    new MoneyMultiplier()
);

//-----------------------------------------------------
// Boost registration
//-----------------------------------------------------

const boosts = [new MoneyBoost(
                    "+20% Revenue",
                    Prices.percent,
                    Icons.percent,
                    "Increase all revenues by 20%",
                    Multipliers.percent
                ),

                new SlicesBoost(
                    "x2 Slices",
                    Prices.x2,
                    Icons.x2,
                    "Double your slices for 60 seconds",
                    Multipliers.x2,
                    Durations.x2
                ),

                new SlicesBoost(
                    "x5 Slices",
                    Prices.x5,
                    Icons.x5,
                    "Multiply your slices by 5 for 30 seconds",
                    Multipliers.x5,
                    Durations.x5
                ),

                new SlicePackBoost(
                    Icons.slicePack
                ),

                new PizzaPackBoost(
                    Icons.pizzaPack
                ),


                new AutoClickerBoost(
                    Icons.autoClicker,
                    AutoClickers.defaultClicksPerSecond
                )
]



//-----------------------------------------------------
// UI
//-----------------------------------------------------


const pizzaUI =
    new PizzaUI(
        document.getElementById("pizzaCanvas"),
        currentPizza.getImage()
    );



const metricUI =
    new MetricUI();



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



//-----------------------------------------------------
// Gameplay actions
//-----------------------------------------------------


function performClick() {


    const result =
        clickManager.click(1);


    uiManager.consumeGameResult(
        result
    );

    audioManager.consumeGameResult(
        result
    );

    wallet.sell(result.getPizzasCooked());

}



function purchaseBoost(boost) {
    
    const result =
        clickManager.buy(boost);


    uiManager.consumeGameResult(
        result
    );


    audioManager.consumeGameResult(
        result
    );


    return true;

}



//-----------------------------------------------------
// Main loop
//-----------------------------------------------------


let previousTime =
    performance.now();

//saveManager.load();

saveManager.clear();

requestAnimationFrame(
    gameLoop
);



function gameLoop(currentTime) {

    const deltaTime =
        (currentTime - previousTime) / 1000;



    previousTime = currentTime;



    metricManager.update(
        deltaTime
    );


    boostManager.setDeltaTimme(
            deltaTime
        );

        
    const result =
        clickManager.click();

     

    audioManager.consumeGameResult(
        result
    );

    uiManager.consumeGameResult(
        result
    );


    requestAnimationFrame(
        gameLoop
    );

}