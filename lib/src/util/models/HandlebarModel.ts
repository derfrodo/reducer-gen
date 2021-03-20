import { ActionCreatorsHandlebarModel } from "./ActionCreatorsHandlebarModel";
import { ActionsHandlebarModel } from "./ActionsHandlebarModel";
import { ModuleNamesHandlebarModel } from "./ModuleNamesHandlebarModel";
import { ReducerActionsHandlebarModel } from "./ReducerActionsHandlebarModel";
import { ReducerHandlebarModel } from "./ReducerHandlebarModel";
import { StateHandlebarModel } from "./StateHandlebarModel";

export interface HandlebarModel {
    featureName: {
        asIs: string;
        pascalCase: string;
        camelCase: string;
    };
    reducer: ReducerHandlebarModel;
    reducerActions: ReducerActionsHandlebarModel;
    actions: ActionsHandlebarModel;
    actionCreators: ActionCreatorsHandlebarModel;
    moduleNames: ModuleNamesHandlebarModel;
    state: StateHandlebarModel;
}
