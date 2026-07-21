/*
    Instant Boost Base Class

    Represents boosts that generate an immediate effect.

    Instant boosts are triggered once and do not
    maintain an active state over time.

    Examples:
    - Add slices
    - Add pizzas
*/

import Boost from "../Boost.js";
import BoostActions from "../BoostAction.js";

export default class InstantBoost extends Boost {

    update(deltatime) {
        return new BoostActions();
    }
    
}
