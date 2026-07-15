export default class Wallet {
    #balance;

    constructor(initialBalance = 10) {
        this.#balance = initialBalance;
    }

    add(amount) {
        this.#balance += amount;
    }

    pay(amount) {
        if (this.#balance < amount) {
            return false;
        }
        this.#balance -= amount;
        return true;
    }

    balance() {
        return this.#balance;
    }

}