export class Game {
    #pizzaCount;
    #remainingSlices;
    #totalSlices;

    constructor(pizzaCount = 0, totalSlices = 8) {
        this.#pizzaCount = pizzaCount;
        this.#totalSlices = totalSlices;
        this.#remainingSlices = totalSlices;
    }

    /**
     * Performs one game action.
     *
     * @returns {{
     *  sliceSold: boolean,
     *  pizzaCooked: boolean,
     *  slicesSold: number
     * }}
     */
    cook() {
        if (this.#remainingSlices > 0) {
            this.#remainingSlices--;

            return {
                sliceSold: true,
                pizzaCooked: false,
                slicesSold: 1
            };
        }

        this.#remainingSlices = this.#totalSlices;
        this.#pizzaCount++;

        return {
            sliceSold: false,
            pizzaCooked: true,
            slicesSold: 0
        };

    }

    addSlices(amount) {
        let slices = amount;

        while (slices > 0) {
            if (this.#remainingSlices > 0) {
                this.#remainingSlices--;
                slices--;

            } else {
                this.#remainingSlices = this.#totalSlices;
                this.#pizzaCount++;
            }
        }
        return  {
                    click: false,
                    slicesSold: amount,
                    pizzasCooked: Math.floor(amount/this.#totalSlices)
                };
    }

    addPizzas(amount) {
        return this.addSlices(amount * this.#totalSlices);
    }

    pizzaCount() {
        return this.#pizzaCount;
    }

    remainingSlices() {
        return this.#remainingSlices;
    }

    totalSlices() {
        return this.#totalSlices;
    }

}