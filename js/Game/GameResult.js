import { GameEvent } from "./GameEvents.js";


export default class GameResult {


    #clicks;

    #slicesCooked;
    #pizzasCooked;


    #moneyEarned;
    #balance;


    #remainingSlices;
    #totalSlices;
    #pizzaCount;


    #metrics;

    #events;

    constructor() {

        this.#clicks = 0;

        this.#slicesCooked = 0;
        this.#pizzasCooked = 0;


        this.#moneyEarned = 0;
        this.#balance = 0;


        this.#remainingSlices = 0;
        this.#totalSlices = 0;
        this.#pizzaCount = 0;


        this.#metrics = {};


        this.#events = new Set();

    }



    //=========================
    // Getters
    //=========================

    getClicks() {
        return this.#clicks;
    }


    getSlicesCooked() {
        return this.#slicesCooked;
    }


    getPizzasCooked() {
        return this.#pizzasCooked;
    }


    getMoneyEarned() {
        return this.#moneyEarned;
    }


    getBalance() {
        return this.#balance;
    }


    getRemainingSlices() {
        return this.#remainingSlices;
    }


    getTotalSlices() {
        return this.#totalSlices;
    }


    getPizzaCount() {
        return this.#pizzaCount;
    }


    getMetrics() {
        return this.#metrics;
    }


    getEvents() {
        return this.#events;
    }




    //=========================
    // Setters
    //=========================


    setClicks(value) {

        this.#clicks = value;

        return this;

    }



    setSlicesCooked(value) {

        this.#slicesCooked = value;

        return this;

    }



    setPizzasCooked(value) {

        this.#pizzasCooked = value;

        return this;

    }



    setMoneyEarned(value) {

        this.#moneyEarned = value;

        return this;

    }



    setBalance(value) {

        this.#balance = value;

        return this;

    }



    setRemainingSlices(value) {

        this.#remainingSlices = value;

        return this;

    }



    setTotalSlices(value) {

        this.#totalSlices = value;

        return this;

    }



    setPizzaCount(value) {

        this.#pizzaCount = value;

        return this;

    }



    setMetrics(metrics) {

        this.#metrics = metrics;

        return this;

    }




    //=========================
    // Adders
    //=========================


    addClicks(amount = 1) {

        this.#clicks += amount;

        return this;

    }



    addSlicesCooked(amount) {

        this.#slicesCooked += amount;

        return this;

    }



    addPizzasCooked(amount) {

        this.#pizzasCooked += amount;

        return this;

    }



    addMoneyEarned(amount) {

        this.#moneyEarned += amount;

        return this;

    }




    //=========================
    // Events
    //=========================


    addEvent(event) {

        this.#events.add(event);

        return this;

    }



    hasEvent(event) {

        return this.#events.has(event);

    }




    clearEvents() {

        this.#events.clear();

        return this;

    }




    //=========================
    // Merge
    //=========================


    merge(other) {


        this.addClicks(
            other.getClicks()
        );


        this.addSlicesCooked(
            other.getSlicesCooked()
        );


        this.addPizzasCooked(
            other.getPizzasCooked()
        );


        this.addMoneyEarned(
            other.getMoneyEarned()
        );


        this.setBalance(
            other.getBalance()
        );


        this.setRemainingSlices(
            other.getRemainingSlices()
        );


        this.setTotalSlices(
            other.getTotalSlices()
        );


        this.setPizzaCount(
            other.getPizzaCount()
        );


        this.setMetrics(
            other.getMetrics()
        );



        for(const event of other.getEvents()) {

            this.addEvent(event);

        }



        return this;

    }

}