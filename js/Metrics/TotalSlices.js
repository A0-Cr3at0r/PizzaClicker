import Metric from "./Metric.js";

export default class TotalSlices extends Metric {
    #total = 0;
    #name = "Total Slices"

    recordSlice(amount) {
        this.#total += amount;
    }

    getValue() {
        return this.#total;
    }

    setValue(value) {
        this.#total = value;
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
