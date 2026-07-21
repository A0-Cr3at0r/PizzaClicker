/*
    Pizza UI Controller

    Responsible for rendering the pizza interface.

    Handles:
    - Pizza image loading and skin changes
    - Pizza slice visualization through Canvas
    - Pizza and slice counters updates
    - Click animation triggering

    This class only manages visual updates.
    It does not contain game logic.
*/

export class PizzaUI {

    #pizzaCountElement;
    #sliceCountElement;

    #pizzaCanvas;
    #ctx;

    #pizzaImage;

    #lastRemainingSlices;
    #lastTotalSlices;


    constructor(
        pizzaCanvas,
    ) {

        this.#pizzaCountElement =
            document.getElementById("pizzaCount");

        this.#sliceCountElement =
            document.getElementById("sliceCount");

        this.#pizzaCanvas =
            pizzaCanvas;

        this.#ctx =
            this.#pizzaCanvas.getContext("2d");

        this.#pizzaImage =
            new Image();

    }

    
    setSkin(imageSrc) {

        this.#pizzaImage.onload = () => {

            if(
                this.#lastRemainingSlices !== undefined &&
                this.#lastTotalSlices !== undefined
            ) {

                this.#drawPizzaSlices(
                    this.#lastRemainingSlices,
                    this.#lastTotalSlices
                );

            }

        };

        this.#pizzaImage.src =
            imageSrc;

    }


    update(
        pizzaCount,
        remainingSlices,
        totalSlices
    ) {

        this.#lastRemainingSlices =
            remainingSlices;

        this.#lastTotalSlices =
            totalSlices;

        this.#pizzaCountElement.textContent =
            pizzaCount;

        this.#sliceCountElement.textContent =
            remainingSlices;

        this.#drawPizzaSlices(
            remainingSlices,
            totalSlices
        );

    }


    #drawPizzaSlices(
        remainingSlices,
        totalSlices
    ) {

        const ctx =
            this.#ctx;

        const canvas =
            this.#pizzaCanvas;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        const visibleSlices =
            totalSlices - remainingSlices;

        const visibleAngle =
            (2 * Math.PI)
            *
            visibleSlices
            /
            totalSlices;

        const centerX =
            canvas.width / 2;

        const centerY =
            canvas.height / 2;

        const radius =
            Math.min(
                centerX,
                centerY
            ) * 0.9;

        ctx.save();

        ctx.beginPath();

        ctx.moveTo(
            centerX,
            centerY
        );

        ctx.arc(
            centerX,
            centerY,
            radius,
            -Math.PI / 2,
            visibleAngle - Math.PI / 2
        );

        ctx.closePath();

        ctx.clip();

        ctx.drawImage(
            this.#pizzaImage,
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.restore();

    }


    pizzaClickAnimation() {

        this.#pizzaCanvas.classList.remove(
            "click-animation"
        );

        void this.#pizzaCanvas.offsetWidth;

        this.#pizzaCanvas.classList.add(
            "click-animation"
        );

    }

}