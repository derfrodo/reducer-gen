import {
    StatePropertyInfo,
    STATE_PROPERT_TYPES,
} from "../../interfaces/StateInterfaceInfo";
import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers/dist";

export class StateService {
    constructor() {
        doBindPrototype(this, StateService.prototype);
    }

    getInitialPropertyValue(info: StatePropertyInfo): string {
        const { nullable, undefineable, types } = info;
        if (undefineable) {
            return "undefined";
        }
        if (nullable) {
            return "null";
        }
        if (types.indexOf(STATE_PROPERT_TYPES.ARRAY) >= 0) {
            return "[]";
        }
        if (types.indexOf(STATE_PROPERT_TYPES.BOOLEAN) >= 0) {
            return "false";
        }
        if (types.indexOf(STATE_PROPERT_TYPES.NUMBER) >= 0) {
            return "0";
        }
        if (types.indexOf(STATE_PROPERT_TYPES.STRING) >= 0) {
            return `""`;
        }
        throw new Error(
            `Failed to resolve initial value for property ${
                info.name
            } (Types: ${types.map((t) => STATE_PROPERT_TYPES[t])})`
        );
    }
}
