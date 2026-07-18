import ActiveBoost from "../Boosts/ActiveBoosts/ActiveBoost.js";
import InstantBoost from "../Boosts/InstantBoosts/InstantBoost.js";
import MoneyBoost from "../Boosts/ModifierBoosts/MoneyBoost.js";
import SlicesBoost from "../Boosts/ModifierBoosts/SlicesBoost.js";
import AutoClickerBoost from "../Boosts/ActiveBoosts/AutoClicker.js";
import BoostActions from "../Boosts/BoostAction.js";
import {
        Icons,
        Prices,
        Durations,
        Multipliers,
        AutoClickers,
        GameConfig
    } from "../Game/Assets.js";


export default class BoostManager {


    #sliceBoosts;
    #moneyBoosts;
    #activeBoosts;
    #instantBoosts;
    #deltaTime;



    constructor() {

        this.#sliceBoosts = [];
        this.#moneyBoosts = [];
        this.#activeBoosts = [];
        this.#instantBoosts = [];

    }



    buy(boost) {


        if(boost instanceof InstantBoost) {

            this.#instantBoosts.push(boost);

        }


        else if(boost instanceof MoneyBoost) {

            this.#moneyBoosts.push(boost);

        }


        else if(boost instanceof SlicesBoost) {

            this.#sliceBoosts.push(boost);

        }


        else if(boost instanceof ActiveBoost) {

            this.#activeBoosts.push(boost);

        }

    }





    computeActions() {


        let actions =
            new BoostActions();



        actions =
            this.#sliceBoosts.reduce(
                (actions, boost) =>
                    boost.applyEffect(actions),
                actions
            );



        actions =
            this.#moneyBoosts.reduce(
                (actions, boost) =>
                    boost.applyEffect(actions),
                actions
            );

        actions =
            this.#instantBoosts.reduce(
                (actions, boost) =>
                    actions.merge(
                        boost.applyEffect()
                    ),
                actions
            );

        this.#instantBoosts = [];

        return actions;

    }


    update() {

        this.#sliceBoosts =
            this.#sliceBoosts.filter(
                boost => boost.update(this.#deltaTime) !== false
            );



        let actions =
            this.computeActions();

        actions =
            this.#activeBoosts.reduce(
                (actions, boost) =>
                    actions.merge(
                        boost.update(this.#deltaTime)
                    ),
                actions
            );



        return actions;

    }

    setDeltaTimme(deltaTime) {
        this.#deltaTime = deltaTime;
    }



    getBoosts() {

        return [
            ...this.#moneyBoosts,
            ...this.#sliceBoosts,
            ...this.#activeBoosts,
            ...this.#instantBoosts
        ];

    }


    //=========================
    // Save / Load
    //=========================

    getState() {

        return {

            moneyBoosts:
                this.#moneyBoosts.length,

            activeBoosts:
                this.#activeBoosts.length

        };

    }



    loadState(state) {


        this.#moneyBoosts = [];
        this.#activeBoosts = [];


        for(let i = 0; i < state.moneyBoosts; i++) {

            this.#addMoneyBoost();
        }


        for(let i = 0; i < state.activeBoosts; i++) {

            this.#addActiveBoost();
        }

    }


    //=========================
    // Internal add
    //=========================

    #addMoneyBoost() {

        this.#moneyBoosts.push( new MoneyBoost(
                                                "+20% Revenue",
                                                Prices.percent,
                                                Icons.percent,
                                                "Increase all revenues by 20%",
                                                Multipliers.percent
                                            ));

    }

    #addActiveBoost() {

        this.#activeBoosts.push(new  AutoClickerBoost(
                                                        Icons.autoClicker,
                                                        AutoClickers.defaultClicksPerSecond
                                                    ));

    }


}