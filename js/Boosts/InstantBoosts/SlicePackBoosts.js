import InstantBoost from "./InstantBoost.js";
import BoostActions from "../BoostAction.js";

export default class SlicePackBoost extends InstantBoost {

    constructor(icon) {
        super("+100 slices", 100, icon, "add 100 slices");
    }

    applyEffect(boostActions = new BoostActions()) {

        boostActions.addSlices(100);

        return boostActions
    }

}