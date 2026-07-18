import BoostActions from "./BoostAction.js";

export default class Boost {
    #name;
    #price;
    #icon;
    #description;
    
    constructor(name, price, icon, description) {
        this.#name = name;
        this.#price = price;
        this.#icon = icon;
        this.#description = description;
    }

    applyEffect(boostActions = new BoostActions()) {
    }

    getName() {
        return this.#name;
    }

    getPrice() {
        return this.#price;
    }

    getIcon() {
        return this.#icon;
    }

    getDescription() {
        return this.#description;
    }
}