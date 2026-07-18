import Boost from "../Boost.js";
import BoostActions from "../BoostAction.js";

export default class InstantBoost extends Boost {
    update(deltatime) {
        return new BoostActions();
    }
}
