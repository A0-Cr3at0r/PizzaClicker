/*
    Metric Base Class

    Defines the common interface for game metrics.

    Metrics can:
    - Update their value over time
    - Record player actions
    - Store and restore their state

    Specific metrics must implement their own behavior.

    This class only defines the metric contract.
*/

export default class Metric {
    #name;

    constructor(name) {

        this.#name = name;

    }


    getName() {

        return this.#name;

    }
    
    update(deltaTime) {}
    recordClick() {}
    recordSlice(amount = 1) {}
    recordPizza(amount = 1) {}
    getValue() {}
    getName() {}

    //=========================
    // Saving
    //=========================
    
    getState() {
        return null;
    }

    setValue(value) {};

    loadState(state) {}

}