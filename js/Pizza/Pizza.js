import { GameConfig } from "../Game/Assets.js";

export default class Pizza {
    #name;
    #totalSlice;
    #price;
    #image;

    constructor(name = GameConfig.name, 
                totalSlice = GameConfig.totalSlices , 
                price = GameConfig.price, 
                image = GameConfig.imageSrc) {
        this.#name = name;
        this.#totalSlice = totalSlice;
        this.#price = price;
        this.#image = image;
    }

    getName() {
        return this.#name;
    }

    getTotalSlice() {
        return this.#totalSlice;
    }

    getPrice() {
        return this.#price;
    }

    getImage() {
        return this.#image;
    }
}