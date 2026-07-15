import ModifierBoost from "./ModifierBoost.js";

export default class PercentBoost extends ModifierBoost {
    #percent;

    constructor(name, price, icon, description, percent) {
        super(name, price, icon, description);
        this.#percent = percent;
    }

    modify(value){
        return value * (1 + this.#percent / 100);
    }

}