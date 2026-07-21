/*
    Slice Pack Boost

    Instant boost that adds a fixed amount
    of slices to the player.

    Effect:
    +100 slices
*/

import InstantBoost from "./InstantBoost.js";
import BoostActions from "../BoostAction.js";
import { Prices } from "../../Game/Assets.js";

export default class SlicePackBoost extends InstantBoost {

    constructor(icon) {
        super("+100 slices",
            Prices.slicePack,
            icon, 
            "add 100 slices instantly");
    }

    applyEffect(boostActions = new BoostActions()) {

        boostActions.addSlices(100);

        return boostActions;
    }

}