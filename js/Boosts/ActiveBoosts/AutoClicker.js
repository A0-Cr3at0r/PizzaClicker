import ActiveBoost  from "./ActiveBoost.js";
import { BoostAction } from "../BoostAction.js";

export default class AutoClickerBoost extends ActiveBoost {

    #clicksPerSecond;
    #timer;

    constructor(icon, clicksPerSecond = 1) {
        super(
            "Auto Clicker",
            500,
            icon,
            "Automatically clicks"
        );
        
        this.#clicksPerSecond = clicksPerSecond;
        this.#timer = 0;
        
    }

    update(deltaTime) {

        this.#timer += deltaTime;
        const actions = [];

        while (this.#timer >= 1) {
            actions.push({
                type: BoostAction.AUTO_CLICK,
                count: this.#clicksPerSecond
            });

            this.#timer -= 1;
        }

        return actions;
    }

}