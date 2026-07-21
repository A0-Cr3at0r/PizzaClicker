/*
    Total Clicks Metric

    Stores the total number of clicks
    performed by the player.

    This metric is persistent and supports
    save/load operations.
*/

import Metric from "./Metric.js";

export default class TotalClicks extends Metric {

    #total = 0;
    #name = "Total Clicks";

    recordClick() {
        this.#total++;
    }

    getValue() {
        return this.#total;
    }

    getName() {
        return this.#name;
    }

    setValue(value) {
        this.#total = value;
    }

    getState() {
        return this.#total;
    }

    loadState(value) {
        this.#total = value;
    }

}