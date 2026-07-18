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


        const result = new GameResult();



        //=========================
        // Clics
        //=========================

        const clicks = actions.getClick();

        if(clicks > 0) {

            result.addClicks(clicks);

            this.#cookSlices(
                clicks,
                result
            );

        }

        if (clicks === 1) {
            result.addEvent(GameEvent.CLICK);
        }

        

        //=========================
        // Ajout direct de slices
        //=========================

        const slicesAdded =
            actions.getSlicesAdded();


        if(slicesAdded > 0) {

            this.#cookSlices(
                slicesAdded,
                result
            );

        }



        //=========================
        // Ajout direct de pizzas
        //=========================

        const pizzasAdded =
            actions.getPizzaAdded();


        if(pizzasAdded > 0) {

            this.#pizzaCount += pizzasAdded;


            result.addPizzasCooked(
                pizzasAdded
            );


            result.addEvent(
                GameEvent.PIZZA_COOKED
            );

        } 



        //=========================
        // Etat courant
        //=========================

        result
            .setRemainingSlices(
                this.#remainingSlices
            )
            .setPizzaCount(
                this.#pizzaCount
            ).setTotalSlices(
                this.totalSlices()
            );


        return result;

    }





    #cookSlices(amount, result) {


        let remaining = amount;



        while(remaining > 0) {


            if(this.#remainingSlices > 0) {


                this.#remainingSlices--;

                result.addSlicesCooked(1);

                remaining--;

            }


            else {


                this.#remainingSlices =
                    this.totalSlices();


                this.#pizzaCount++;


                result.addPizzasCooked(1);


                result.addEvent(
                    GameEvent.PIZZA_COOKED
                );

            }

        }

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

}