import ModifierBoost from "./ModifierBoost.js";

export default class MultiplierBoost extends ModifierBoost {
    #multiplier
    #duration

    constructor(name, price, icon, description, multiplier, duration) {
        super(name, price, icon, description);
        this.#multiplier = multiplier;
        this.#duration = duration;
    }

    modify(value){
        return value*this.#multiplier;
    } 

    update(dt) {
        this.#duration -= dt;
        return this.#duration > 0;
    }

}