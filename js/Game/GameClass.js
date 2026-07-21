/**
 * Core game engine.
 *
 * Handles pizza production logic, slice consumption
 * and transformation of player actions into game results.
 *
 * Does not manage UI, audio or persistence.
 */

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
     * Applies gameplay actions and updates the game state.
     *
     * Converts clicks, boosts and instant additions
     * into cooked slices and pizzas.
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
        const pizzasFromSlices = this.#cookSlices(clicks + slicesAdded);

        // Les pizzas ajoutées directement.
        if (pizzasAdded > 0) {
            this.#pizzaCount += pizzasAdded;
        }

        const pizzasCooked =
            pizzasFromSlices +
            pizzasAdded;

        return this.#createResult(
            actions.getClick(),
            slicesCooked,
            pizzasCooked
        );

    }

    /**
     * Converts slice production into completed pizzas.
     *
     * Consumes remaining slices and creates pizzas
     * when a complete pizza is reached.
     */

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

    /**
     * Creates a GameResult snapshot from the current game state.
     *
     * Adds gameplay events generated during the operation.
     */

    #createResult(clicks, slicesCooked, pizzasCooked) {

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

    //=========================
    // Save / Load
    //=========================

    getState() {

        return {

            pizzaCount: this.#pizzaCount,

            remainingSlices: this.#remainingSlices
        };
    }


    loadState(state) {

        this.#pizzaCount = state.pizzaCount;

        this.#remainingSlices = state.remainingSlices;
    }

}