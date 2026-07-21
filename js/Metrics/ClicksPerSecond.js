/*
    Clicks Per Second Metric

    Tracks the player's clicking rate.

    Updates its value every second based on
    the number of clicks recorded during the interval.

    Extends Metric base behavior.
*/

import Metric from "./Metric.js";

export default class ClicksPerSecond extends Metric {

    #elapsed = 0;
    #clicks = 0;
    #value = 0;
    #name = "Clicks Per Second";

    recordClick() {
        this.#clicks++;
    }

    update(dt) {

        this.#elapsed += dt;

        if (this.#elapsed >= 1) {

            this.#value = this.#clicks;
            this.#clicks = 0;
            this.#elapsed -= 1;

        }

    }

    getValue() {
        return this.#value;
    }

    setValue(value) {
        this.#value = value;
    }

    getName() {
        return this.#name;
    }

}
