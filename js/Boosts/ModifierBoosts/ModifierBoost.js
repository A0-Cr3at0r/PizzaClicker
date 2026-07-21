/*
    Modifier Boost Base Class

    Represents boosts that modify gameplay values.

    Modifier boosts affect existing actions
    instead of directly generating resources.

    Examples:
    - Money multiplier
    - Slice multiplier
*/

import Boost from "../Boost.js";
import BoostActions from "../BoostAction.js";

export default class ModifierBoost extends Boost {

    update(dt) {
        return true;
    }

}