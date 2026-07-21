/*
=====================================================
 SettingsManager

 Manages user preferences.

 Responsibilities:
 - Store settings state
 - Apply settings to game systems
 - Handle audio preferences
 - Handle theme preferences
 - Handle pizza skin preferences
 - Persist settings data

=====================================================
*/

export default class SettingsManager {
    
    #audioManager;
    #themeManager;
    #skinManager;
    #settingsKey;

    #pizzaUI;

    #settings;

    static VERSION = 1;


    constructor(
        audioManager,
        themeManager,
        skinManager,
        pizzaUI,
        settingsKey = "pizzaClickerSettings"
    ) {

        this.#audioManager = audioManager;

        this.#themeManager = themeManager;

        this.#skinManager = skinManager;

        this.#settingsKey = settingsKey;

        this.#pizzaUI =  pizzaUI;

        this.#settings =
        {
            version: SettingsManager.VERSION,

            darkTheme: false,

            audio:
            {
                muted: false,

                musicVolume:20,

                sfxVolume: 100
            },

            pizzaSkin: "classic"

        };

    }

    //=========================
    // Apply Settings
    //=========================
    /**
     * Applies current settings to all managed systems.
     *
     * Synchronizes theme, audio and pizza skin
     * with their respective managers.
     */
    apply() {

        this.#themeManager.setDark( this.#settings.darkTheme );

        this.#audioManager.mute( this.#settings.audio.muted );

        this.#audioManager.setMusicVolume( this.#settings.audio.musicVolume / 100 );

        this.#audioManager.setSFXVolume( this.#settings.audio.sfxVolume / 100 );

        this.#skinManager.setSkin( this.#settings.pizzaSkin );

        this.#pizzaUI.setSkin( this.#skinManager.getImage() );

    }

    //=========================
    // Load / Save
    //=========================

    save() {

        localStorage.setItem(

            this.#settingsKey,

            JSON.stringify(
                this.#settings
            )

        );

    }




    load() {

        const json = localStorage.getItem( this.#settingsKey );

        if(json === null) {
            return false;
        }

        const saved = JSON.parse(json);

        if( saved.version !== SettingsManager.VERSION ) {

            console.warn("Unsupported settings version");

            return false;
        }

        this.#settings = saved;

        return true;

    }


    reset() {

        this.#settings = {

            version: SettingsManager.VERSION,

            darkTheme:false,

            audio:{
                muted: false,
                musicVolume: 20,
                sfxVolume: 100
            },

            pizzaSkin:"classic"

        };

        this.apply();

        this.save();
    }

    //=========================
    // Theme
    //=========================

    setDarkTheme(value){

        this.#settings.darkTheme = value;

        this.#themeManager.setDark( value );

        this.save();

    }


    isDarkTheme() {

        return this.#settings.darkTheme;

    }

    //=========================
    // Audio
    //=========================

    setMute(value){

        this.#settings.audio.muted = value;

        this.#audioManager.mute( value );

        this.save();
    }

    isMuted() {

        return this.#settings.audio.muted;

    }


    setMusicVolume(value){

        this.#settings.audio.musicVolume = value;

        this.#audioManager.setMusicVolume( value / 100 );

        this.save();
    }


    getMusicVolume() {

        return this.#settings.audio.musicVolume;

    }


    setSfxVolume(value) {

        this.#settings.audio.sfxVolume = value;

        this.#audioManager.setSFXVolume( value / 100 );

        this.save();
    }


    getSfxVolume() {

        return this.#settings.audio.sfxVolume;

    }

    //=========================
    // Pizza Skin
    //=========================

    setPizzaSkin(skin){

        this.#settings.pizzaSkin = skin;

        this.#skinManager.setSkin( skin );

        this.#pizzaUI.setSkin( this.#skinManager.getImage() );

        this.save();
    }


    getPizzaSkin() {

        return this.#settings.pizzaSkin;

    }
    //=========================
    // Export
    //=========================

    getState() {

        return structuredClone( this.#settings );

    }
}