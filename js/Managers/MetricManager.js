export default class MetricManager {

    #metrics = new Map();


    addMetric(metric) {

        this.#metrics.set(
            metric.getName(),
            metric
        );

    }



    update(deltaTime) {

        for (const metric of this.#metrics.values()) {

            metric.update(deltaTime);

        }

    }



    recordClick(amount = 1) {

        for (const metric of this.#metrics.values()) {

            metric.recordClick(amount);

        }

    }



    recordSlice(amount = 1) {

        for (const metric of this.#metrics.values()) {

            metric.recordSlice(amount);

        }

    }



    recordPizza(amount = 1) {

        for (const metric of this.#metrics.values()) {

            metric.recordPizza(amount);

        }

    }



    getMetric(name) {

        return this.#metrics.get(name);

    }



    getMetrics() {

        return this.#metrics.values();

    }



    getSnapshot() {

        const snapshot = {};

        for (const metric of this.#metrics.values()) {

            snapshot[metric.getName()] =
                metric.getValue();

        }

        return snapshot;

    }

    //=========================
    // Saving
    //=========================

    getState() {

        const state = {};


        for(const metric of this.#metrics.values()) {

            state[
                metric.getName()
            ] = metric.getValue();

        }


        return state;

    }


    loadState(state) {

        for(const metric of this.#metrics.values()) {

            const value =
                state[
                    metric.getName()
                ];


            if(value !== undefined) {

                metric.setValue(value);

            }

        }

    }



}