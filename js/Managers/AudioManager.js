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
    #seriousBackgroundMusic;

    #paySuccess;
    #payError;



    constructor() {


        this.#clickSound = clickSound;

        this.#cookSound = cookSound;

        this.#successSound = successSound;


        this.#backgroundMusic =
            backgroundMusic;


        this.#seriousBackgroundMusic =
            seriousBackgroundMusic;



        this.#paySuccess =
            paySuccess;


        this.#payError =
            payError;



        this.#backgroundMusic.volume = 0.2;

    }




    consumeGameResult(result) {


        for(const event of result.getEvents()) {


            switch(event) {
                case GameEvent.CLICK:
                    this.#play(
                        this.#clickSound
                    );
                    
                    break;

                case GameEvent.BOOST_PURCHASED:
                    this.#play(
                        this.#paySuccess
                    );

                    break;

                case GameEvent.PIZZA_COOKED:

                    this.#play(
                        this.#cookSound
                    );

                    break;


                case GameEvent.PAYMENT_FAILED:

                    this.#play(
                        this.#payError
                    );

                    break;



                case GameEvent.SUCCESS:

                    this.#play(
                        this.#successSound
                    );

                    break;

            }

        }

    }




    #play(sound) {

        sound.currentTime = 0;

        sound.play();

    }




    playBackgroundMusic() {

        this.#backgroundMusic.loop = true;

        this.#backgroundMusic.play();

    }




    startSeriousMode() {


        this.#backgroundMusic.pause();


        this.#backgroundMusic =
            this.#seriousBackgroundMusic;


        this.#backgroundMusic.loop = true;

        this.#backgroundMusic.play();

    }




    stopSeriousMode() {


        this.#backgroundMusic.pause();


        this.#backgroundMusic =
            backgroundMusic;


        this.#backgroundMusic.loop = true;

        this.#backgroundMusic.play();

    }


}