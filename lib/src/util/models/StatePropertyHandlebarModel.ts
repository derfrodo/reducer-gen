import { STATE_PROPERT_TYPES } from "../../interfaces/StateInterfaceInfo";

export type StatePropertyHandlebarModel = {
    name: string;
    namePascalCase: string;
    type: string;
    baseActionEnumValue: string;
    initialValue: string;
    types: STATE_PROPERT_TYPES[];
    nullable: boolean;
    undefineable: boolean;
    isArray: boolean;
};
