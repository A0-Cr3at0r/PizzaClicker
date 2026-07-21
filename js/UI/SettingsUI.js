/*
    Settings UI Controller

    Responsible for managing the settings interface.

    Handles:
    - Opening and closing the settings panel
    - Binding settings controls events
    - Applying visual theme changes
    - Updating audio preferences through SettingsManager
    - Selecting pizza skins

    This class only manages UI interactions.
    Settings data persistence and logic are handled by SettingsManager.
*/

export default class SettingsUI {

    #settingsManager;
    #settingsButton;
    #settingsPanel;
    #settingsOverlay;
    #closeSettingsButton;


    constructor(settingsManager) {

        this.#settingsManager =
            settingsManager;

        this.#settingsButton =
            document.getElementById("settingsButton");

        this.#settingsPanel =
            document.getElementById("settingsPanel");

        this.#settingsOverlay =
            document.getElementById("settingsOverlay");

        this.#closeSettingsButton =
            document.getElementById("closeSettingsButton");

        this.#bindEvents();

        this.#loadSettings();

    }


    #openSettings() {

        this.#settingsPanel.classList.add("open");

        this.#settingsOverlay.classList.add("show");

    }


    #closeSettings() {

        this.#settingsPanel.classList.remove("open");

        this.#settingsOverlay.classList.remove("show");

    }

    //=========================
    // Initialization
    //=========================

    #loadSettings() {

        /*
            Theme
        */

        const darkTheme =
            document.getElementById("darkTheme");

        darkTheme.checked =
            this.#settingsManager.isDarkTheme();

        this.#applyTheme(
            darkTheme.checked
        );

        /*
            Audio
        */

        const mute =
            document.getElementById( "muteAudio");

        mute.checked =
            this.#settingsManager.isMuted();

        document
            .getElementById("musicVolume")
            .value = this.#settingsManager.getMusicVolume();

        document
            .getElementById("sfxVolume")
            .value = this.#settingsManager.getSfxVolume();

        /*
            Skin
        */

        this.#selectSkin(

            this.#settingsManager.getPizzaSkin()

        );

    }

    //=========================
    // Events
    //=========================

    #bindEvents() {

        this.#settingsButton.addEventListener( "click",
                () => {

                    document
                        .getElementById("sideMenu")
                        .classList.remove("open");

                    document
                        .getElementById("overlay")
                        .classList.remove("show");

                    this.#openSettings();

                }
            );

        this.#closeSettingsButton.addEventListener("click",
                () => {

                    this.#closeSettings();

                }
            );

        this.#settingsOverlay.addEventListener( "click",
                () => {

                    this.#closeSettings();

                }
            );

        /*
            Theme
        */

        document
            .getElementById("darkTheme")
            .addEventListener(
                "change",
                event => {

                    const value = event.target.checked;

                    this.#settingsManager.setDarkTheme(value);

                    this.#applyTheme(value);

                }
            );

        /*
            Audio
        */

        document
            .getElementById("muteAudio")
            .addEventListener("change",
                event => {

                    this.#settingsManager
                        .setMute(
                            event.target.checked
                        );

                }
            );

        document
            .getElementById("musicVolume")
            .addEventListener("input",
                event => {

                    this.#settingsManager
                        .setMusicVolume(
                            Number(event.target.value)
                        );
                }
            );

        document
            .getElementById("sfxVolume")
            .addEventListener("input",
                event => {

                    this.#settingsManager
                        .setSfxVolume(
                            Number(event.target.value)
                        );
                }
            );

        /*
            Pizza skins
        */

        document
            .querySelectorAll(".pizza-skin")
            .forEach(
                skin => {
                    skin.addEventListener("click",
                        () => {

                            const skinName =
                                skin.dataset.skin;

                            this.#settingsManager
                                .setPizzaSkin(
                                    skinName
                                );

                            this.#selectSkin(
                                skinName
                            );

                        }
                    );
                }
            );
    }

    //=========================
    // Theme
    //=========================

    #applyTheme(enabled) {

        if(enabled) {

            document.body
                .classList
                .add("dark");

        }

        else {

            document.body
                .classList
                .remove("dark");

        }

    }

    //=========================
    // Skin
    //=========================

    #selectSkin(skinName) {

        document
            .querySelectorAll(".pizza-skin")
            .forEach(
                skin => {

                    skin.classList.toggle("selected", skin.dataset.skin === skinName);

                }
            );
    }


}