import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers/dist";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import { ActionsHandlebarModel } from "../models/ActionsHandlebarModel";
import { HandlebarModel } from "../models/HandlebarModel";
import { ModuleNamesHandlebarModel } from "../models/ModuleNamesHandlebarModel";
import ReduxModuleNamingHelper from "../ReduxModuleNamingHelper";
import ReduxModulFileService from "../ReduxModulFileService";

export class ModelFactory {
    constructor(
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private reduxModulFileService: ReduxModulFileService,
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
            baseActions: this.reduxModuleNamingHelper.getActionStrings(
                stateInfo
            ),
        };
        return result;
    }

    createModuleNamesHandlebarModel(): ModuleNamesHandlebarModel {
        return {
            base: this.reduxModulFileService.getGeneratedModulNames(),
            extended: this.reduxModulFileService.getExtensionModulNames(),
            main: this.reduxModulFileService.getMainModulNames(),
        };
    }

    createHandlebarModel(stateInfo: StateInterfaceInfo): HandlebarModel {
        return {
            actions: this.createActionsHandlebarModel(stateInfo),
            moduleNames: this.createModuleNamesHandlebarModel(),
        };
    }
}

export const createTestFactory = (): ModelFactory => {
    return new ModelFactory(
        new ReduxModuleNamingHelper({ addFeatureAsActionPrefix: true }),
        new ReduxModulFileService({}),
        { addBubbleFlagForActions: true, createReducerContext: true }
    );
};
