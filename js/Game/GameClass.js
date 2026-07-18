import Pizza from "../Pizza/Pizza.js";
import GameResult from "./GameResult.js";
import { GameEvent } from "./GameEvents.js";


export class Game {

    #pizzaCount;
    #remainingSlices;
    #pizza;


    constructor(
        pizzaCount = 0,
        pizza = new Pizza()
    ) {

        this.#pizzaCount = pizzaCount;
        this.#pizza = pizza;
        this.#remainingSlices = pizza.getTotalSlice();

    }



    /**
     * Applique une action de jeu.
     *
     * @param {BoostActions} actions
     * @returns {GameResult}
     */
    applyActions(actions) {

        const totalSlices = this.totalSlices();

        const clicks = actions.getClick() * actions.getSliceMultiplier();
        const slicesAdded = actions.getSlicesAdded();
        const pizzasAdded = actions.getPizzaAdded();

        // Nombre total de slices produites.
        const slicesCooked =
            clicks +
            slicesAdded +
            pizzasAdded * totalSlices;

        // Les clicks et les slices ajoutées consomment des parts.
        const pizzasFromSlices =
            this.#cookSlices(clicks + slicesAdded);

        // Les pizzas ajoutées directement.
        if (pizzasAdded > 0) {
            this.#pizzaCount += pizzasAdded;
        }

        const pizzasCooked =
            pizzasFromSlices +
            pizzasAdded;

        return this.#createResult(
            clicks,
            slicesCooked,
            pizzasCooked
        );

    }





    #cookSlices(amount) {

        let pizzasCooked = 0;

        while (amount > 0) {

            if (this.#remainingSlices > 0) {

                this.#remainingSlices--;
                amount--;

            } else {

                this.#remainingSlices = this.totalSlices();
                this.#pizzaCount++;
                pizzasCooked++;

            }

        }

        return pizzasCooked;

    }

    #createResult(clicks, slicesCooked, pizzasCooked, sliceMultiplier, moneyMultiplier) {

        const result = new GameResult();

        result
            .setClicks(clicks)
            .setSlicesCooked(slicesCooked)
            .setPizzasCooked(pizzasCooked)
            .setRemainingSlices(this.#remainingSlices)
            .setPizzaCount(this.#pizzaCount)
            .setTotalSlices(this.totalSlices());

        if (clicks > 0) {
            result.addEvent(GameEvent.CLICK);
        }

        if (pizzasCooked > 0) {
            result.addEvent(GameEvent.PIZZA_COOKED);
        }

        return result;

    }





    pizzaCount() {

        return this.#pizzaCount;

    }


    remainingSlices() {

        return this.#remainingSlices;

    }


    totalSlices() {

        return this.#pizza.getTotalSlice();

    }

    getState() {

        return {

            pizzaCount:
                this.#pizzaCount,

            remainingSlices:
                this.#remainingSlices

        };

    }



    loadState(state) {

        this.#pizzaCount =
            state.pizzaCount;


        this.#remainingSlices =
            state.remainingSlices;

    }

}