import Boost from "../Boost.js";

export default class ModifierBoost extends Boost {

    modify(value){
        return value;
    }

    update(dt) {
        return true;
    }

}