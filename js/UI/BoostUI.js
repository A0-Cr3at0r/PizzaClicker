export default class BoostUI {

    #boostList;
    #moneyCount;
    #message;

    #tooltip;

    #messageTimeout;

    #onBuy;

    constructor(boostManager, onBuy) {

        this.#boostList = document.getElementById("boostList");
        this.#moneyCount = document.getElementById("moneyCount");
        this.#message = document.getElementById("boostMessage");

        this.#messageTimeout = null;

        this.#onBuy = onBuy;

        this.#tooltip = this.#createTooltip();

        this.#createBoostCards(boostManager);

        this.render(boostManager.wallet());

    }

    #createTooltip() {

        const tooltip = document.createElement("div");

        tooltip.classList.add("boost-tooltip-global");

        document.body.appendChild(tooltip);

        return tooltip;

    }

    #createBoostCards(boostManager) {

        for (const boost of boostManager.getBoosts()) {

            const li = document.createElement("li");

            li.classList.add("boost-card");

            li.dataset.price = boost.getPrice();

            li.innerHTML = `
                            <img src="${boost.getIcon()}" alt="${boost.getName()}">

                            <div class="boost-info">

                                <strong>
                                    ${boost.getName()}
                                </strong>

                                <div class="boost-tooltip">

                                    <strong>${boost.getName()}</strong>

                                    <span>
                                        ${boost.getDescription()}
                                    </span>

                                    <span>
                                        Price : ${boost.getPrice()} 🪙
                                    </span>

                                </div>

                            </div>

                            <span class="boost-price">
                                ${boost.getPrice()} 🪙
                            </span>
                        `;

            li.addEventListener("click", () => {

                const success = this.#onBuy(boost);

                if (!success) {
                    this.#showMessage("Not enough coins!");
                }

            });

            li.addEventListener("mouseenter", (event) => {

                this.#showTooltip(boost, event);

            });

            li.addEventListener("mousemove", (event) => {

                this.#moveTooltip(event);

            });

            li.addEventListener("mouseleave", () => {

                this.#hideTooltip();

            });

            this.#boostList.appendChild(li);

        }

    }




    render(wallet) {
        this.#moneyCount.textContent = wallet.balance();

        for (const card of this.#boostList.children) {
            const price = Number(card.dataset.price);

            if (wallet.balance() < price) {
                card.classList.add("disabled");
            } else {
                card.classList.remove("disabled");
            }

        }

    }


    #showMessage(message) {

        this.#message.textContent = message;

        this.#message.classList.add("visible");

        clearTimeout(this.#messageTimeout);

        this.#messageTimeout = setTimeout(() => {

            this.#message.classList.remove("visible");

        }, 1000);

    }

    
    #showTooltip(boost, event) {

        this.#tooltip.innerHTML = `
            <strong>${boost.getName()}</strong>
            <span>${boost.getDescription()}</span>
            <span>Price : ${boost.getPrice()} 🪙</span>
        `;

        this.#tooltip.classList.add("visible");

        this.#moveTooltip(event);

    }


    #moveTooltip(event) {

        const offset = 15;

        this.#tooltip.style.left =
            `${event.clientX + offset}px`;

        this.#tooltip.style.top =
            `${event.clientY + offset}px`;

    }


    #hideTooltip() {

        this.#tooltip.classList.remove("visible");

    }

}