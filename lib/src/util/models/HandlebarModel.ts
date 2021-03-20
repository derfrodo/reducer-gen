import { ActionCreatorsHandlebarModel } from "./ActionCreatorsHandlebarModel";
import { ActionsHandlebarModel } from "./ActionsHandlebarModel";
import { ModuleNamesHandlebarModel } from "./ModuleNamesHandlebarModel";
import { ReducerActionsHandlebarModel } from "./ReducerActionsHandlebarModel";
import { StateHandlebarModel } from "./StateHandlebarModel";

export interface HandlebarModel {
    reducerActions: ReducerActionsHandlebarModel;
    actions: ActionsHandlebarModel;
    actionCreators: ActionCreatorsHandlebarModel;
    moduleNames: ModuleNamesHandlebarModel;
    state: StateHandlebarModel;
}
