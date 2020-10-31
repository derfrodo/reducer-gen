import FeatureStateDataObject from "./FeatureStateDataObject";

export interface StateInterfaceInfo {
    featureData: FeatureStateDataObject;
    stateInterfaceName?: string | undefined;
    hasStateAsDefaultExport?: boolean;
    stateProperties: StatePropertyInfo[];
    importClauses: ImportClause[];
}

export type ImportClause = string;

export interface StatePropertyInfo {
    name: string;
    types: STATE_PROPERT_TYPES[];
    typesText: string;
    nullable: boolean;
    undefineable: boolean;
}

export enum STATE_PROPERT_TYPES {
    STRING,
    NUMBER,
    BOOLEAN,
    OBJECT,
    ARRAY,
}

export default StateInterfaceInfo;
