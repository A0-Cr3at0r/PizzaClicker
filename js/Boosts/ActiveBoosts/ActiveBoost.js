/*
    Active Boost Base Class

    Represents boosts that have a time-based behavior.

    Active boosts are updated continuously by the game loop
    and can generate actions over time.

    Examples:
    - Auto clicker
    - Temporary automated effects
*/

import Boost from "../Boost.js";

export default class ActiveBoost extends Boost {

    update(dt) {}

}