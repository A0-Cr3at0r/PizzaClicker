import ModifierBoost from "../Boosts/ModifierBoosts/ModifierBoost.js";
import ActiveBoost from "../Boosts/ActiveBoosts/ActiveBoost.js";
import InstantBoost from "../Boosts/InstantBoosts/InstantBoost.js";

export default class BoostManager {
    #wallet;

    #boosts;

    #modifierBoosts;
    #activeBoosts;

    constructor(wallet) {
        this.#wallet = wallet;

        this.#boosts = [];

        this.#modifierBoosts = [];
        this.#activeBoosts = [];

    }

    register(boost) {
        this.#boosts.push(boost);

    }

    buy(boost, game) {
        if (!this.#wallet.pay(boost.getPrice())) {
            return false;
        }

        if (boost instanceof InstantBoost) {
            boost.apply(game);
        }

        else if (boost instanceof ModifierBoost) {
            this.#modifierBoosts.push(boost);
        }

        else if (boost instanceof ActiveBoost) {
            this.#activeBoosts.push(boost);
        }

        return true;
    }

    computeGain(baseValue) {
        let value = baseValue;

        for (const boost of this.#modifierBoosts) {
            value = boost.modify(value);
        }

        return value;

    }

    update(deltaTime) {
        const actions = [];

        this.#modifierBoosts =
            this.#modifierBoosts.filter(boost => boost.update(deltaTime) !== false);

        this.#activeBoosts = this.#activeBoosts.filter(boost => {
            const boostActions = boost.update(deltaTime);

            if (boostActions !== false) {
                actions.push(...boostActions);
                return true;
            }

            return false;
        });

        return actions;
    }

    getBoosts() {
        return this.#boosts;
    }

    wallet() {
        return this.#wallet;
    }

}