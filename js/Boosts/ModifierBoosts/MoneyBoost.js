/*
    Money Boost

    Permanent modifier that increases money gained
    from selling pizzas.

    The multiplier is applied through BoostActions.
*/

import ModifierBoost from "./ModifierBoost.js";
import BoostActions from "../BoostAction.js";

export default class MoneyBoost extends ModifierBoost {
    #moneyMultiplier;

    constructor(name, price, icon, description, moneyMultiplier) {
        super(name, price, icon, description);
        this.#moneyMultiplier = moneyMultiplier;
    }

    applyEffect(boostActions = new BoostActions()) {
        boostActions.addMoneyMultiplier(this.#moneyMultiplier / 100);
        return boostActions;
    }

}