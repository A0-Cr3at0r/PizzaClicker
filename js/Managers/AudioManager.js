/*
    Audio Manager

    Handles all game audio.

    Responsibilities:
    - Play sound effects based on game events
    - Manage background music
    - Handle music and SFX volume
    - Handle mute state
    - Save and restore audio settings

    This manager consumes GameEvents through GameResult
    and does not contain gameplay logic.
*/

import { GameEvent } from "../Game/GameEvents.js";


const clickSound =
    new Audio("assets/sounds/click.mp3");

const cookSound =
    new Audio("assets/sounds/cook.mp3");

const successSound =
    new Audio("assets/sounds/success.mp3");

const backgroundMusic =
    new Audio("assets/sounds/backgroundMusic.mp3");

const seriousBackgroundMusic =
    new Audio("assets/sounds/seriousBackgroundMusic.mp3");

const paySuccess =
    new Audio("assets/sounds/paySuccess.mp3");

const payError =
    new Audio("assets/sounds/payError.mp3");


export class AudioManager {

    #clickSound;
    #cookSound;
    #successSound;

    #backgroundMusic;
    #normalBackgroundMusic;
    #seriousBackgroundMusic;

    #paySuccess;
    #payError;

    #musicVolume;
    #sfxVolume;
    #muted;


    constructor() {

        this.#clickSound = clickSound;
        this.#cookSound = cookSound;
        this.#successSound = successSound;

        this.#normalBackgroundMusic =
            backgroundMusic;

        this.#seriousBackgroundMusic =
            seriousBackgroundMusic;

        this.#backgroundMusic =
            this.#normalBackgroundMusic;

        this.#paySuccess = paySuccess;
        this.#payError = payError;

        this.#musicVolume = 0.2;
        this.#sfxVolume = 1;
        this.#muted = false;

        this.#backgroundMusic.volume =
            this.#musicVolume;
        this.#backgroundMusic.loop = true;

    }


    consumeGameResult(result) {

        for(const event of result.getEvents()) {

            switch(event) {

                case GameEvent.CLICK:

                    this.#play( this.#clickSound );
                    break;

                case GameEvent.BOOST_PURCHASED:

                    this.#play( this.#paySuccess );
                    break;

                case GameEvent.PIZZA_COOKED:

                    this.#play( this.#cookSound );
                    break;

                case GameEvent.PAYMENT_FAILED:

                    this.#play( this.#payError );
                    break;

                case GameEvent.SUCCESS:

                    this.#play(this.#successSound);
                    break;
            }

        }

    }


    #play(sound) {

        if(this.#muted) {
            return;
        }

        sound.currentTime = 0;

        sound.play()
            .catch(() => {});
    }


    playBackgroundMusic() {

        if(this.#muted) {
            return;
        }

        if(this.#backgroundMusic.paused) {

            this.#backgroundMusic
                .play()
                .catch(() => {});
        }
    }


    stopBackgroundMusic() {

        this.#backgroundMusic.pause();

    }


    startSeriousMode() {

        this.#changeBackground( this.#seriousBackgroundMusic );

    }

    stopSeriousMode() {

        this.#changeBackground( this.#normalBackgroundMusic );

    }

    #changeBackground(music) {

        this.#backgroundMusic.pause();

        this.#backgroundMusic.currentTime = 0;

        this.#backgroundMusic = music;

        this.#backgroundMusic.volume = 0.2;
        this.#backgroundMusic.loop = true;

        this.#backgroundMusic
            .play()
            .catch(() => {});

    }


    setMusicVolume(value) {

        this.#musicVolume = value;

        this.#backgroundMusic.volume =
            value;
    }


    setSFXVolume(value) {

        this.#sfxVolume = value;

        this.#clickSound.volume = value;
        this.#cookSound.volume = value;
        this.#successSound.volume = value;
        this.#paySuccess.volume = value;
        this.#payError.volume = value;

    }


    mute(value) {

        this.#muted = value;

        this.#backgroundMusic.muted = value;

        this.#clickSound.muted = value;
        this.#cookSound.muted = value;
        this.#successSound.muted = value;
        this.#paySuccess.muted = value;
        this.#payError.muted = value;

    }


    getState() {

        return {

            musicVolume: this.#musicVolume,

            sfxVolume: this.#sfxVolume,

            muted: this.#muted

        };
    }


    loadState(state) {

        this.setMusicVolume( state.musicVolume );

        this.setSFXVolume( state.sfxVolume );

        this.mute( state.muted );

    }

}