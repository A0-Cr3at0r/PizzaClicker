export default class MetricUI {


    #elements = new Map();



    constructor() {

        this.#elements.set(
            "Total Clicks",
            document.getElementById("totalClicks")
        );


        this.#elements.set(
            "Total Slices",
            document.getElementById("totalSlices")
        );


        this.#elements.set(
            "Clicks Per Second",
            document.getElementById("clicksPerSecond")
        );


        this.#elements.set(
            "Slices Per Second",
            document.getElementById("slicesPerSecond")
        );


        this.#elements.set(
            "Pizzas Per Second",
            document.getElementById("pizzasPerSecond")
        );

    }





    render(metrics) {


        for(
            const [name,value]
            of Object.entries(metrics)
        ) {


            const element =
                this.#elements.get(name);



            if(element) {

                element.textContent =
                    value;

            }

        }

    }


}