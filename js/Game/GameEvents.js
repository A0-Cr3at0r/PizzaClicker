/**
 * Defines all events emitted by the game engine.
 *
 * Events are consumed by external managers
 * such as UI and AudioManager.
 */

export const GameEvent = Object.freeze({

    CLICK: "CLICK",

    SLICE_COOKED: "SLICE_COOKED",
    PIZZA_COOKED: "PIZZA_COOKED",

    BOOST_PURCHASED: "BOOST_PURCHASED",

    MONEY_GAINED: "MONEY_GAINED",

    PAYMENT_SUCCESS: "PAYMENT_SUCCESS",
    PAYMENT_FAILED: "PAYMENT_FAILED",

});