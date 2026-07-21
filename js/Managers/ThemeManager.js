/*
    Theme Manager

    Controls the global application theme.

    Responsibilities:
    - Enable dark mode
    - Disable dark mode
    - Save and restore theme preference
*/

export default class ThemeManager {

    #dark;

    constructor() {

        this.#dark = false;

    }


    setDark(enabled) {

        this.#dark = enabled;

        if(this.#dark) {
            document.body.classList.add("dark");
        }

        else {
            document.body.classList.remove("dark");
        }

    }


    toggle() {

        this.setDark(!this.#dark);

    }


    isDark() {

        return this.#dark;

    }


    getState() {

        return {dark: this.#dark };

    }


    loadState(state) {

        this.setDark(state.dark);

    }

}