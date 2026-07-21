/*
    Wallet

    Responsible for managing the player's economy.

    Handles:
    - Current balance
    - Pizza selling rewards
    - Purchases validation
    - Money multipliers
    - Save/load state

    The Wallet does not:
    - Manage UI updates
    - Manage boosts
    - Handle game events
*/

export default class Wallet {

    #balance;
    #pizzaPrice;
    #moneyMultiplier;


    constructor(initialBalance = 10, pizzaPrice = 5) {
        
        this.#balance = initialBalance;
        this.#pizzaPrice = pizzaPrice;
        this.#moneyMultiplier = 1;

    }

    //=========================
    // Balance
    //=========================

    balance() {

        return this.#balance;

    }

    //=========================
    // Operations
    //=========================

    add(amount) {

        if(amount < 0) {
            throw new Error(
                "Cannot add negative amount"
            );
        }

        this.#balance += amount;

        return this;

    }

    sell(pizzasSold) {

        this.add(pizzasSold * this.#pizzaPrice * this.#moneyMultiplier);

    }

    getMoneyMultiplier() {

        return this.#moneyMultiplier;

    }

    setMoneyMultiplier(bonus) {

            this.#moneyMultiplier = 1 + bonus;  

    }

    canPay(amount) {

        return this.#balance >= amount;

    }

    pay(amount) {

        if(!this.canPay(amount)) {
            return false;
        }

        this.#balance -= amount;

        return true;

    }

    //=========================
    // Saving
    //=========================

    getState() {

        return {

            balance:
                this.#balance

        };

    }

    loadState(state) {

        this.#balance =
            state.balance;

    }

    //=========================
    // Utility
    //=========================

    reset(amount = 0) {

        this.#balance = amount;

        return this;

    }

}