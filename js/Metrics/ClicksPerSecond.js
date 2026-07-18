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
            this.#elapsed = 0;

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
