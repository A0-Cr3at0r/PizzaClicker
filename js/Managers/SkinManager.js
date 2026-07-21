/*
    Skin Manager

    Manages available pizza skins.

    Responsibilities:
    - Store available skins
    - Change current skin
    - Provide current image path
    - Save and restore selected skin
*/

export default class SkinManager {

    #skins;
    #currentSkin;


    constructor() {

        this.#skins = {

            classic: "assets/images/PizzaGame.png",

            mexican: "assets/images/MexicanPizza.png",

            allDressed: "assets/images/AllDressed.png",

            goodPizza: "assets/images/GoodPizza.png",

            ultimate: "assets/images/UltimatePizza.png"

        };

        this.#currentSkin =
            "classic";

    }


    setSkin(name) {

        if(this.#skins[name] === undefined) {

            console.warn("Unknown skin:", name);

            return;
        }

        this.#currentSkin =
            name;

    }


    getCurrentSkin() {

        return this.#currentSkin;

    }


    getImage() {

        return this.#skins[this.#currentSkin];

    }


    getState() {

        return { currentSkin: this.#currentSkin };

    }


    loadState(state) {

        this.setSkin(state.currentSkin);

    }

}