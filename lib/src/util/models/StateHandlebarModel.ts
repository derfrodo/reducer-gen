import { StatePropertyHandlebarModel } from "./StatePropertyHandlebarModel";

export interface StateHandlebarModel {
    stateName: string;
    hasStateAsDefaultExport: boolean;
    properties: StatePropertyHandlebarModel[];
    imports: string[];
    importsWithAdditionalLevel: string[];
}
