import {
    StatePropertyInfo,
    STATE_PROPERT_TYPES,
} from "../../interfaces/StateInterfaceInfo";
import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers/dist";

export class StateService {
    constructor() {
        doBindPrototype(this, StateService.prototype);
    }

    /**
     * Returns initial value for given property info.
     * Returns first type with known init value (e.g. for union types like string|number it will be "")
     * @param info
     * @returns
     */
    getInitialPropertyValue(info: StatePropertyInfo): string {
        const { nullable, undefineable, types } = info;
        if (undefineable) {
            return "undefined";
        }
        if (nullable) {
            return "null";
        }
        for (const type of types) {
            switch (type) {
                case STATE_PROPERT_TYPES.NULL: {
                    return "null";
                }
                case STATE_PROPERT_TYPES.UNDEFINED: {
                    return "undefined";
                }
                case STATE_PROPERT_TYPES.ARRAY: {
                    return "[]";
                }
                case STATE_PROPERT_TYPES.BOOLEAN: {
                    return "false";
                }
                case STATE_PROPERT_TYPES.NUMBER: {
                    return "0";
                }
                case STATE_PROPERT_TYPES.STRING: {
                    return `""`;
                }
            }
        }
        throw new Error(
            `Failed to resolve initial value for property ${
                info.name
            } (Types: ${types.map((t) => STATE_PROPERT_TYPES[t])})`
        );
    }
}
