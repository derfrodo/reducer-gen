import {
    doBindPrototype,
    StringHelper,
} from "@derfrodo/frodo-s-little-helpers/dist";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo, {
    StatePropertyInfo,
} from "../../interfaces/StateInterfaceInfo";
import { ActionCreatorsHandlebarModel } from "../models/ActionCreatorsHandlebarModel";
import { ActionsHandlebarModel } from "../models/ActionsHandlebarModel";
import { HandlebarModel } from "../models/HandlebarModel";
import { ModuleNamesHandlebarModel } from "../models/ModuleNamesHandlebarModel";
import { ReducerActionsHandlebarModel } from "../models/ReducerActionsHandlebarModel";
import { StateHandlebarModel } from "../models/StateHandlebarModel";
import { StatePropertyHandlebarModel } from "../models/StatePropertyHandlebarModel";
import ReduxModuleNamingHelper from "../ReduxModuleNamingHelper";
import ReduxModulFileService from "../ReduxModulFileService";

export class ModelFactory {
    constructor(
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private reduxModulFileService: ReduxModulFileService,
        private options: ReduxCodeGeneratorOptions,
        private stringHelper: StringHelper = new StringHelper()
    ) {
        doBindPrototype(this, ModelFactory.prototype);
        if (!stringHelper) {
            this.stringHelper = new StringHelper();
        }
    }

    createActionCreatorsHandlebarModel(
        stateInfo: StateInterfaceInfo
    ): ActionCreatorsHandlebarModel {
        const result: ActionCreatorsHandlebarModel = {
            baseActionCreatorsName: this.reduxModuleNamingHelper.getActionCreatorsName(
                stateInfo,
                "base"
            ),
            mainActionCreatorsName: this.reduxModuleNamingHelper.getActionCreatorsName(
                stateInfo,
                "main"
            ),
            extendedActionCreatorsName: this.reduxModuleNamingHelper.getActionCreatorsName(
                stateInfo,
                "ext"
            ),
        };
        return result;
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

    createReducerActionsHandlebarModel(
        stateInfo: StateInterfaceInfo
    ): ReducerActionsHandlebarModel {
        const result: ReducerActionsHandlebarModel = {
            baseReducerActionsName: this.reduxModuleNamingHelper.getReducerActionName(
                stateInfo,
                "base"
            ),
            mainReducerActionsName: this.reduxModuleNamingHelper.getReducerActionName(
                stateInfo,
                "main"
            ),
            extendedReducerActionsName: this.reduxModuleNamingHelper.getReducerActionName(
                stateInfo,
                "ext"
            ),
        };
        return result;
    }

    createStateHandlebarModel(
        stateInfo: StateInterfaceInfo
    ): StateHandlebarModel {
        const stateName = stateInfo.stateInterfaceName;
        if (!stateName) {
            throw new Error("Failed to resolve state name");
        }

        const result: StateHandlebarModel = {
            stateName: stateName,
            hasStateAsDefaultExport: stateInfo.hasStateAsDefaultExport || false,
            properties: stateInfo.stateProperties.map((p) =>
                this.createStatePropertyHandlebarModel(p, stateInfo)
            ),
            imports: stateInfo.importClauses,
            importsWithAdditionalLevel: this.getImportClausesWithAdditionalLevel(
                stateInfo
            ),
        };
        return result;
    }

    createStatePropertyHandlebarModel(
        propertyInfo: StatePropertyInfo,
        stateInfo: StateInterfaceInfo
    ): StatePropertyHandlebarModel {
        const result: StatePropertyHandlebarModel = {
            name: propertyInfo.name,
            namePascalCase: this.stringHelper?.toPascalCased(propertyInfo.name),
            type: propertyInfo.typesText,
            baseActionEnumValue: this.reduxModuleNamingHelper.getActionString(
                propertyInfo,
                stateInfo
            ),
        };
        return result;
    }

    /**
     * Adds an additional level to a given import clause. Needs relative paths though
     * @param clause clause like "import * from "../../module"
     */
    addLevelToImportClause(clause: string): string {
        return clause.replace(/(?<=(from\s*['"]{1}))(\.)/, (m) => `../${m}`);
    }

    getImportClausesWithAdditionalLevel(
        stateInfo: StateInterfaceInfo
    ): string[] {
        return stateInfo.importClauses.map(this.addLevelToImportClause);
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
            reducerActions: this.createReducerActionsHandlebarModel(stateInfo),
            actions: this.createActionsHandlebarModel(stateInfo),
            actionCreators: this.createActionCreatorsHandlebarModel(stateInfo),
            moduleNames: this.createModuleNamesHandlebarModel(),
            state: this.createStateHandlebarModel(stateInfo),
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
