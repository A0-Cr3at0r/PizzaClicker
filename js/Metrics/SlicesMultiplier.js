import Metric from "./Metric.js";

export default class SliceMultiplier extends Metric {

    #multiplier;

    constructor() {
        super("Slice multiplier");
        this.#multiplier = 1;
    }

    getValue() {
        return this.#multiplier;
    }

    setValue(value) {
        this.#multiplier = value;
    }

}