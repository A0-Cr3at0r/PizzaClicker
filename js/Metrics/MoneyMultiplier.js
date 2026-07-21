/*
    Money Multiplier Metric

    Stores the current money gain multiplier.

    Used by:
    - Wallet calculations
    - UI display of active effects

    The value represents the current multiplier state.
*/

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