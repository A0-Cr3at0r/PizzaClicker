export default class BoostUI {

    #boostList;
    #moneyCount;
    #message;

    #messageTimeout;

    constructor(boostManager, game) {

        this.#boostList = document.getElementById("boostList");
        this.#moneyCount = document.getElementById("moneyCount");
        this.#message = document.getElementById("boostMessage");

        this.#messageTimeout = null;

        this.#createBoostCards(boostManager, game);

        this.render(boostManager.wallet());
    }

    #createBoostCards(boostManager, game) {

        for (const boost of boostManager.getBoosts()) {

            const li = document.createElement("li");

            li.classList.add("boost-card");

            li.innerHTML = `
                <img src="${boost.getIcon()}" alt="${boost.getName()}">

                <div class="boost-info">
                    <strong>${boost.getName()}</strong>
                    <small>${boost.getDescription()}</small>
                </div>

                <button class="buy-button">
                    Buy<br>
                    <span>${boost.getPrice()} 🪙</span>
                </button>`
            ;

            const button = li.querySelector("button");

            button.addEventListener("click", () => {

                const purchased = boostManager.buy(boost, game);

                if (!purchased) {
                    this.#showMessage("Not enough coins!");
                    return;
                }

                this.render(boostManager.wallet());
            });

            this.#boostList.appendChild(li);
        }
    }

    render(wallet) {

        this.#moneyCount.textContent = wallet.balance();

    }

    #showMessage(message) {

        this.#message.textContent = message;

        this.#message.classList.add("visible");

        clearTimeout(this.#messageTimeout);

        this.#messageTimeout = setTimeout(() => {

            this.#message.classList.remove("visible");

        }, 1800);

    }

}