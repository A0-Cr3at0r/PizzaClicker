/*
=====================================================
 ClickManager

 Handles player actions.

 Responsibilities:
 - Process clicks
 - Process boost purchases
 - Apply boost effects
 - Update wallet
 - Update metrics
 - Produce GameResult

=====================================================
*/

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

    /**
    * Executes a complete player interaction cycle.
    *
    * Pipeline:
    * Boosts → Game → Wallet → Metrics → GameResult
     */

    click(click = 0) {

        const actions = this.#boostManager.update();

        actions.addClick(click);

        const result = this.#game.applyActions(actions);

        this.#wallet.setMoneyMultiplier(actions.getMoneyMultiplier());

        this.#wallet.sell(result.getPizzasCooked());

        this.#updateMetrics(result);

        result.setBalance(this.#wallet.balance());

        const metrics = this.#metricManager.getSnapshot();

        metrics["Slice Multiplier"] = actions.getSliceMultiplier();

        metrics["Money Multiplier"] = actions.getMoneyMultiplier();

        result.setMetrics(metrics);

        return result;

    }

    /**
     * Attempts to purchase a boost.
     *
     * Validates payment, registers the boost,
     * executes its effects and returns a GameResult
     * containing the transaction state.
     */

    buy(boost) {

        if( !this.#wallet.pay( boost.getPrice() ) ) {

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
            this.#metricManager.recordClick( result.getClicks() );
        }

        if(result.getSlicesCooked() > 0) {
            this.#metricManager.recordSlice( result.getSlicesCooked() );
        }

        if(result.getPizzasCooked() > 0) {
            this.#metricManager.recordPizza( result.getPizzasCooked() );
        }

    }


    #applyModifiers(actions) {

        const modified = new BoostActions();

        modified.merge(actions);

        modified.setSlicesAdded( actions.getSlicesAdded() * actions.getSliceMultiplier() );

        return modified;

    }


}