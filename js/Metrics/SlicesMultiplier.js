/*
    Slice Multiplier Metric

    Stores the current slice production multiplier.

    Used by:
    - Game logic for slice calculation
    - UI display of active effects

    The value represents the current multiplier state.
*/

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