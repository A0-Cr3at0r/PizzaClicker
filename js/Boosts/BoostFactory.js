/*
    Boost Factory

    Responsible for creating configured boost instances.

    Centralizes:
    - Boost constructors
    - Default values
    - Assets references
    - Balance parameters

    This class only creates boosts.
    It does not manage purchases or effects.
*/

import MoneyBoost from "./ModifierBoosts/MoneyBoost.js";
import SlicesBoost from "./ModifierBoosts/SlicesBoost.js";

import SlicePackBoost from "./InstantBoosts/SlicePackBoosts.js";
import PizzaPackBoost from "./InstantBoosts/PizzaPackBoost.js";

import AutoClickerBoost from "./ActiveBoosts/AutoClicker.js";

import {
    Icons,
    Prices,
    Durations,
    Multipliers,
    AutoClickers
} from "../Game/Assets.js";

export default class BoostFactory {

    static createMoneyBoost() {

        return new MoneyBoost(
            "+20% Revenue",
            Prices.percent,
            Icons.percent,
            "Increase all revenues by 20%",
            Multipliers.percent
        );
        
    }

    static createX2Boost() {

        return new SlicesBoost(
            "x2 Slices",
            Prices.x2,
            Icons.x2,
            "Double your slices for 60 seconds",
            Multipliers.x2,
            Durations.x2
        );

    }

    static createX5Boost() {

        return new SlicesBoost(
            "x5 Slices",
            Prices.x5,
            Icons.x5,
            "Multiply your slices by 5 for 30 seconds",
            Multipliers.x5,
            Durations.x5
        );

    }

    static createSlicePack() {

        return new SlicePackBoost(
            Icons.slicePack
        );

    }

    static createPizzaPack() {

        return new PizzaPackBoost(
            Icons.pizzaPack
        );

    }

    static createAutoClicker() {

        return new AutoClickerBoost(
            Icons.autoClicker,
            AutoClickers.defaultClicksPerSecond
        );

    }

}