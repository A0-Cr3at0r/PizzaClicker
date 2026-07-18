import ActiveBoost  from "./ActiveBoost.js";
import BoostActions  from "../BoostAction.js";


export default class AutoClickerBoost extends ActiveBoost {

    #clicksPerSecond;
    #timer;
    #clicks;

    constructor(icon, clicksPerSecond = 1) {
        super(
            "Auto Clicker",
            500,
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

        const boostAction = new BoostActions();

        this.#timer += deltaTime;

        while (this.#timer >= 1) {
            this.#clicks++;
            this.#timer -= 1;
        }

        return this.applyEffect(boostAction);
    }

}