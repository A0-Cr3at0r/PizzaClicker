import ModifierBoost from "./ModifierBoost.js";
import BoostActions  from "../BoostAction.js";


export default class SlicesBoost extends ModifierBoost {
    #multiplier
    #duration

    constructor(name, price, icon, description, multiplier, duration) {
        super(name, price, icon, description);
        this.#multiplier = multiplier;
        this.#duration = duration;
    }

    applyEffect(boostActions = new BoostActions()){
        
        boostActions.multiplySlices(this.#multiplier);

        return boostActions;
    } 

    update(dt) {
        this.#duration -= dt;
        return this.#duration > 0;
    }

}