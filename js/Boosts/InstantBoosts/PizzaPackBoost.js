import InstantBoost from "./InstantBoost.js";

export default class PizzaPackBoost extends InstantBoost {

    constructor(icon) {
        super("+100 pizzas", 1000, icon, "add 100 pizza");
    }

    apply(game){
        game.addPizzas(100);
    }

}