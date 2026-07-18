export default class Wallet {

    #balance;
    #pizzaPrice;


    constructor(initialBalance = 10, pizzaPrice = 5) {
        
        this.#balance = initialBalance;
        this.#pizzaPrice = pizzaPrice;

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
        this.add(pizzasSold * this.#pizzaPrice);
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
    // Utility
    //=========================

    reset(amount = 0) {

        this.#balance = amount;

        return this;

    }

}