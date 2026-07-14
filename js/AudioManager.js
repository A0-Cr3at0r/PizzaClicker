const clickSound = new Audio("assets/sounds/click.mp3");
const cookSound = new Audio("assets/sounds/cook.mp3");
const successSound = new Audio("assets/sounds/success.mp3");
const backgroundMusic = new Audio("assets/sounds/backgroundMusic.mp3");
const seriousBackgroundMusic = new Audio("assets/sounds/seriousBackgroundMusic.mp3");   

export class AudioManager {
    #clickSound;
    #cookSound;
    #successSound;
    #backgroundMusic;

    constructor() {
        this.#clickSound = clickSound;
        this.#cookSound = cookSound;
        this.#successSound = successSound;
        this.#backgroundMusic = backgroundMusic;
        this.#backgroundMusic.volume = 0.2; // Set background music volume to 20%
    }

    click() {
        this.#clickSound.currentTime = 0;
        this.#clickSound.play();
    }

    cook() {
        this.#cookSound.currentTime = 0;
        this.#cookSound.play();
    }

    success() {
        this.#successSound.currentTime = 0;
        this.#successSound.play();
    }

    playBackgroundMusic() { 
        this.#backgroundMusic.loop = true;
        this.#backgroundMusic.play();
    }

    startSeriousMode() {
        this.#backgroundMusic.loop = seriousBackgroundMusic;
    }

    stopSeriousMode() {
        this.#backgroundMusic.loop = backgroundMusic;
    }

}
