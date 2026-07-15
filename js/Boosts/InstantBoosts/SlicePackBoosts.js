import InstantBoost from "./InstantBoost.js";

export default class SlicePackBoost extends InstantBoost {

    constructor(icon) {
        super("+100 slices", 100, icon, "add 100 slices");
    }

    apply(game){
        game.addSlices(100);
    }

}