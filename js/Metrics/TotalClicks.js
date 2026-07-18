import Metric from "./Metric.js";

export default class TotalClicks extends Metric {

    #total = 0;
    #name = "Total Clicks"

    recordClick() {
        this.#total++;
    }

    getValue() {
        return this.#total;
    }

    getName() {
        return this.#name;
    }

    getState() {
        return this.#total;
    }

    loadState(value) {
        this.#total = value;
    }

}