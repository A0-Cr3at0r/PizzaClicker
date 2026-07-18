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




    click(click = 0) 
    {

        const actions = this.#boostManager.update();

        actions.addClick(click);

        console.log(actions.getSliceMultiplier(), actions.getMoneyMultiplier(), actions.getSlicesAdded(), actions.getPizzaAdded(), actions.getClick());

        const result =
            this.#game.applyActions(actions);

        this.#wallet.setMoneyMultiplier(actions.getMoneyMultiplier());
    
        this.#updateMetrics(result);


        result.setBalance(
            this.#wallet.balance()
        );


        const metrics =
            this.#metricManager.getSnapshot();


        metrics["Slice Multiplier"] =
            actions.getSliceMultiplier();


        metrics["Money Multiplier"] =
            actions.getMoneyMultiplier();


        result.setMetrics(metrics);

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


        this.#boostManager.buy(boost);


        const result =
            this.click();



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



        modified.merge(actions);


        modified.setSlicesAdded(

            actions.getSlicesAdded()
            *
            actions.getSliceMultiplier()

        );


        return modified;

    }


}