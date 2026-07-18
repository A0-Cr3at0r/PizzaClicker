import Metric from "./Metric.js";

export default class MoneyMultiplier extends Metric {

    #multiplier;

    constructor() {
        super("Money multiplier");
        this.#multiplier = 1;
    }

    getValue() {
        return this.#multiplier;
    }

    setValue(value) {
        this.#multiplier = value;
    }

}