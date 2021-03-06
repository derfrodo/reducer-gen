import { StatePropertyHandlebarModel } from "./StatePropertyHandlebarModel";

export interface StateHandlebarModel {
    stateName: string;
    getDefaultStateMethodName: string;
    hasStateAsDefaultExport: boolean;
    properties: StatePropertyHandlebarModel[];
    imports: string[];
    importsWithAdditionalLevel: string[];
}
