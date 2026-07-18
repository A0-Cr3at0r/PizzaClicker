import InstantBoost from "./InstantBoost.js";
import BoostActions from "../BoostAction.js";

export default class PizzaPackBoost extends InstantBoost {

    constructor(icon) {
        super("+100 pizzas", 1000, icon, "add 100 pizza");
    }

    applyEffect(boostActions = new BoostActions()) {

        boostActions.addPizzas(100);
        
        return boostActions

    }

}