/*
=====================================================
 SaveManager

 Handles game persistence.

 Responsibilities:
 - Create save snapshots
 - Store game state in localStorage
 - Restore game state
 - Manage save versions

=====================================================
*/

export default class SaveManager {

    #game;
    #wallet;
    #boostManager;
    #metricManager;

    #saveKey;

    static VERSION = 1;


    constructor(
        game,
        wallet,
        boostManager,
        metricManager,
        saveKey = "pizzaClickerSave"
    ) {

        this.#game = game;
        this.#wallet = wallet;
        this.#boostManager = boostManager;
        this.#metricManager = metricManager;

        this.#saveKey = saveKey;

    }

    //=========================
    // Save / Load
    //=========================

    save() {

        const state = {

            version: SaveManager.VERSION,

            game: this.#game.getState(),

            wallet: this.#wallet.getState(),

            boosts: this.#boostManager.getState(),

            metrics: this.#metricManager.getState()
        };

        localStorage.setItem( this.#saveKey, JSON.stringify(state) );
    }


    load() {

        const json = localStorage.getItem( this.#saveKey );

        if(json === null) {
            return false;
        }

        const state = JSON.parse(json);

        switch(state.version) {

            case 1:

                this.#game.loadState( state.game );

                this.#wallet.loadState( state.wallet );

                this.#boostManager.loadState( state.boosts );

                this.#metricManager.loadState( state.metrics );

                return true;


            default:

                console.warn( "Unsupported save version:", state.version );

                return false;

        }

    }

    //=========================
    // Utilities
    //=========================

    reset() {

        localStorage.removeItem( this.#saveKey );
    }


    hasSave() {

        return localStorage.getItem( this.#saveKey ) !== null;
    }
}