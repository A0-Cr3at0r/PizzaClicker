/*
    Boost UI Controller

    Responsible for managing the boost interface.

    Handles:
    - Dynamic boost card creation
    - Boost purchase interactions
    - Wallet display updates
    - Disabled state management
    - Tooltip display
    - Error messages

    This class only manages UI behavior.
    Boost logic and purchases are handled externally.
*/

export default class BoostUI {

    #boostList;
    #moneyCount;

    #message;

    #tooltip;

    #messageTimeout;

    #onBuy;

    #cards;


    constructor(boosts, onBuy) {

        this.#boostList =
            document.getElementById("boostList");

        this.#moneyCount =
            document.getElementById("moneyCount");

        this.#message =
            document.getElementById("boostMessage");

        this.#messageTimeout = null;

        this.#onBuy = onBuy;

        this.#cards = new Map();

        this.#tooltip =
            this.#createTooltip();

        this.#createBoostCards(boosts);

    }

//=========================
// Rendering
//=========================

    render(balance) {

        this.#moneyCount.textContent = balance;

        for(
            const [boost,card]
            of this.#cards
        ) {

            if(balance < boost.getPrice()) {
                card.classList.add("disabled");
            }

            else {
                card.classList.remove("disabled");
            }

        }

    }


    #createBoostCards(boosts) {

        for (const createBoost of boosts) {

            const boost = createBoost();

            const card = this.#createBoostCard(boost, createBoost);

            this.#cards.set(boost, card);

            this.#boostList.appendChild(card);

        }

    }


    #createBoostCard(boost, createBoost) {

        const li = document.createElement("li");

        li.classList.add("boost-card");

        li.dataset.price = boost.getPrice();

        li.innerHTML = `
            <img src="${boost.getIcon()}" alt="${boost.getName()}">

            <div class="boost-info">
                <strong> ${boost.getName()} </strong>
            </div>

            <span class="boost-price"> ${boost.getPrice()} 🪙 </span>`;


        li.addEventListener("click", () => {

            const success = this.#onBuy(createBoost);

            if (!success) {
                this.#showMessage("Not enough coins!");
            }

        });


        li.addEventListener("mouseenter", event => {
            this.#showTooltip(boost, event);
        });


        li.addEventListener("mousemove", event => {
            this.#moveTooltip(event);
        });


        li.addEventListener("mouseleave", () => {
            this.#hideTooltip();
        });

        return li;

    }


    #showMessage(message) {

        this.#message.textContent = message;

        this.#message.classList.add("visible");

        clearTimeout(this.#messageTimeout);

        this.#messageTimeout = setTimeout(() => {

            this.#message.classList.remove("visible");

        }, 1000);

    }

//=========================
// Tooltip
//=========================

    #createTooltip() {

        const tooltip = document.createElement("div");

        tooltip.classList.add("boost-tooltip-global");

        document.body.appendChild(tooltip);

        return tooltip;

    }


    #showTooltip(boost, event) {

        this.#tooltip.innerHTML = `
        
            <strong> ${boost.getName()} </strong>

            <span>  ${boost.getDescription()} </span>

            <span>  Price : ${boost.getPrice()} 🪙 </span>
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