import { GameEvent } from "../Game/GameEvents.js";


export default class UIManager {


    #pizzaUI;
    #metricUI;
    #boostUI;



    constructor(
        pizzaUI,
        metricUI,
        boostUI
    ) {

        this.#pizzaUI = pizzaUI;

        this.#metricUI = metricUI;

        this.#boostUI = boostUI;

    }



    consumeGameResult(result) {
        
        for(const event of result.getEvents()) {
            if ((event === GameEvent.BOOST_PURCHASED) || (event === GameEvent.CLICK)) {
                 

                this.#pizzaUI.update(
                    result.getPizzaCount(),
                    result.getRemainingSlices(),
                    result.getTotalSlices()
                );
            }
        }


        this.#metricUI.render(
            result.getMetrics()
        );



        this.#boostUI.render(
            result.getBalance()
        );




        if(
            result.hasEvent(
                GameEvent.CLICK
            )
        ) {

            this.#pizzaUI
                .pizzaClickAnimation();
        }


    }


}