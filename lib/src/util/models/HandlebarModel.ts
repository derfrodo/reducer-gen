import { ActionCreatorsHandlebarModel } from "./ActionCreatorsHandlebarModel";
import { ActionsHandlebarModel } from "./ActionsHandlebarModel";
import { ModuleNamesHandlebarModel } from "./ModuleNamesHandlebarModel";

export interface HandlebarModel {
    actions: ActionsHandlebarModel;
    actionCreators: ActionCreatorsHandlebarModel;
    moduleNames: ModuleNamesHandlebarModel;
}
