/*
    Slices Per Second Metric

    Tracks the slice production rate.

    Accumulates produced slices and updates
    the displayed value every second.

    Extends Metric base behavior.
*/

import Metric from "./Metric.js";

export default class SlicesPerSecond extends Metric {

    #elapsed = 0;
    #slices = 0;
    #value = 0;
    #name = "Slices Per Second";

    recordSlice(slices = 1) {
        this.#slices += slices;
    }

    update(dt) {

        this.#elapsed += dt;

        if (this.#elapsed >= 1) {
            this.#value = this.#slices;
            this.#slices = 0;
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
