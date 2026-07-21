/*
    Slice Pack Boost

    Instant boost that adds a fixed amount
    of slices to the player.

    Effect:
    +100 slices
*/

import InstantBoost from "./InstantBoost.js";
import BoostActions from "../BoostAction.js";

export default class SlicePackBoost extends InstantBoost {

    constructor(icon) {
        super("+100 slices",
            100,
            icon, 
            "add 100 slices instantly");
    }

    applyEffect(boostActions = new BoostActions()) {

        boostActions.addSlices(100);

        return boostActions;
    }

}