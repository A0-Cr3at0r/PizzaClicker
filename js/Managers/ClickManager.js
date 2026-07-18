import BoostActions from "../Boosts/BoostAction.js";
import { GameEvent } from "../Game/GameEvents.js";
import GameResult from "../Game/GameResult.js";


export default class ClickManager {


    #game;
    #wallet;
    #boostManager;
    #metricManager;



    constructor(
        game,
        wallet,
        boostManager,
        metricManager
    ) {

        this.#game = game;
        this.#wallet = wallet;
        this.#boostManager = boostManager;
        this.#metricManager = metricManager;

    }




    click(
        boostActions = new BoostActions(1)
    ) {


        const actions =
            this.#applyModifiers(boostActions);


        const result =
            this.#game.applyActions(actions);
    
        this.#updateMetrics(result);


        result.setBalance(
            this.#wallet.balance()
        );


        result.setMetrics(
            this.#metricManager.getSnapshot()
        );

        return result;

    }






    buy(boost) {


        if(
            !this.#wallet.pay(
                boost.getPrice()
            )
        ) {
            const result = new GameResult();
            result.addEvent(GameEvent.PAYMENT_FAILED);

            return result;

        }



        const actions =
            this.#boostManager.buy(boost);



        const result =
            this.click(actions);



        result.addEvent(
            GameEvent.BOOST_PURCHASED
        );



        result.setBalance(
            this.#wallet.balance()
        );



        return result;

    }






    #updateMetrics(result) {


        if(result.getClicks() > 0) {

            this.#metricManager.recordClick(
                result.getClicks()
            );

        }



        if(result.getSlicesCooked() > 0) {

            this.#metricManager.recordSlice(
                result.getSlicesCooked()
            );

        }



        if(result.getPizzasCooked() > 0) {

            this.#metricManager.recordPizza(
                result.getPizzasCooked()
            );

        }


    }






    #applyModifiers(actions) {


        const modified =
            new BoostActions();



        modified.setClick(
            actions.getClick()
        );



        modified.setSlicesAdded(

            actions.getSlicesAdded()
            *
            actions.getSliceMultiplier()

        );



        modified.setPizzaAdded(
            actions.getPizzaAdded()
        );



        modified.setMoneyMultiplier(
            actions.getMoneyMultiplier()
        );



        return modified;

    }


}