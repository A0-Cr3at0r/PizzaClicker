import Metric from "./Metric.js";

export default class PizzasPerSecond extends Metric {

    #elapsed = 0;
    #pizzas = 0;
    #value = 0;
    #name = "Pizzas Per Second";

    recordPizza(pizzas = 1) {
        this.#pizzas += pizzas;
    }

    update(dt) {
        this.#elapsed += dt;

        if (this.#elapsed >= 1) {
            this.#value = this.#pizzas;
            this.#pizzas = 0;
            this.#elapsed = 0;

        }

    }

    getValue() {
        return this.#value;
    }

    setValue(value) {
        this.#value = value;
    }

    getName() {
        return this.#name;
    }

}
