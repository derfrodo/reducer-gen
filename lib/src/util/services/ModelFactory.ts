import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers/dist";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import { ActionsHandlebarModel } from "../models/ActionsHandlebarModel";
import ReduxModuleNamingHelper from "../ReduxModuleNamingHelper";

export class ModelFactory {
    constructor(
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private options: ReduxCodeGeneratorOptions
    ) {
        doBindPrototype(this, ModelFactory.prototype);
    }

    createActionsHandlebarModel(
        stateInfo: StateInterfaceInfo
    ): ActionsHandlebarModel {
        const result: ActionsHandlebarModel = {
            baseActionsEnumName: this.reduxModuleNamingHelper.getActionEnumName(
                stateInfo,
                "base"
            ),
            mainActionsEnumName: this.reduxModuleNamingHelper.getActionEnumName(
                stateInfo,
                "main"
            ),
            extendedActionsEnumName: this.reduxModuleNamingHelper.getActionEnumName(
                stateInfo,
                "ext"
            ),
            actions: this.reduxModuleNamingHelper.getActionStrings(stateInfo),
        };
        return result;
    }
}
