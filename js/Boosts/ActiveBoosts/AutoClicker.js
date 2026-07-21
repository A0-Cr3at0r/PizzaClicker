/*
    Auto Clicker Boost

    Generates automatic clicks over time.

    The boost accumulates clicks according to
    its clicks-per-second rate.

    The generated clicks are converted into
    BoostActions and applied by the game.
*/

import ActiveBoost  from "./ActiveBoost.js";
import BoostActions  from "../BoostAction.js";
import { Prices } from "../../Game/Assets.js";


export default class AutoClickerBoost extends ActiveBoost {

    #clicksPerSecond;
    #timer;
    #clicks;

    constructor(icon, clicksPerSecond = 1) {
        super(
            "Auto Clicker",
            Prices.autoClicker,
            icon,
            "Automatically clicks"
        );
        
        this.#clicksPerSecond = clicksPerSecond;
        this.#timer = 0;
        this.#clicks = 0;
        
    }
    
    applyEffect(boostAction = new BoostActions()) {
        
        boostAction.addClick(this.#clicks);
        this.#clicks = 0;

        return boostAction;
    }

    update(deltaTime) {

        this.#timer += deltaTime;

        while (this.#timer >= 1) {
            this.#clicks++;
            this.#timer -= 1;
        }

        return this.applyEffect( new BoostActions());
    }

}