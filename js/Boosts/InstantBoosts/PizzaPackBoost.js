/*
    Pizzas Pack Boost

    Instant boost that adds a fixed amount
    of pizzas to the player.

    Effect:
    +100 pizzas
*/

import InstantBoost from "./InstantBoost.js";
import BoostActions from "../BoostAction.js";

export default class PizzaPackBoost extends InstantBoost {

    constructor(icon) {
        super(
                "+100 Pizzas",
                1000,
                icon,
                "Adds 100 pizzas instantly"
            );
    }

    applyEffect(boostActions = new BoostActions()) {

        boostActions.addPizzas(100);
        
        return boostActions;

    }

}