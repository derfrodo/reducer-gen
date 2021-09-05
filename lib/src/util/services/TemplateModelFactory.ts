import {
    doBindPrototype,
    StringHelper,
} from "@derfrodo/frodo-s-little-helpers/dist";
import type { ReduxCodeGeneratorOptions } from "../../interfaces/ReduxCodeGeneratorOptions";
import {
    StateInterfaceInfo,
    StatePropertyInfo,
    STATE_PROPERT_TYPES,
} from "../../interfaces/StateInterfaceInfo";
import type { ActionCreatorsHandlebarModel } from "../models/ActionCreatorsHandlebarModel";
import type { ActionsHandlebarModel } from "../models/ActionsHandlebarModel";
import type { ModuleNamesHandlebarModel } from "../models/ModuleNamesHandlebarModel";
import type { ReducerActionsHandlebarModel } from "../models/ReducerActionsHandlebarModel";
import type { ReducerHandlebarModel } from "../models/ReducerHandlebarModel";
import type { StateHandlebarModel } from "../models/StateHandlebarModel";
import type { StatePropertyHandlebarModel } from "../models/StatePropertyHandlebarModel";
import type { TemplateHandlebarModel } from "../models/TemplateHandlebarModel";
import { ReduxModuleNamingHelper } from "../ReduxModuleNamingHelper";
import { ReduxModulFileService } from "../ReduxModulFileService";
import { StateService } from "./StateService";

export class TemplateModelFactory {
    constructor(
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private reduxModulFileService: ReduxModulFileService,
        private options: ReduxCodeGeneratorOptions,
        private stateService: StateService = new StateService(),
        private stringHelper: StringHelper = new StringHelper()
    ) {
        doBindPrototype(this, TemplateModelFactory.prototype);
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
            baseReducerTypeguard: this.reduxModuleNamingHelper.getReducerActionTypeGuardMethodName(
                stateInfo,
                "base"
            ),
            mainReducerTypeguard: this.reduxModuleNamingHelper.getReducerActionTypeGuardMethodName(
                stateInfo,
                "main"
            ),
            extendedReducerTypeguard: this.reduxModuleNamingHelper.getReducerActionTypeGuardMethodName(
                stateInfo,
                "ext"
            ),
        };
        return result;
    }

    createReducerHandlebarModel(
        stateInfo: StateInterfaceInfo
    ): ReducerHandlebarModel {
        const result: ReducerHandlebarModel = {
            baseReducerName: this.reduxModuleNamingHelper.getReducerMethodName(
                stateInfo,
                "base"
            ),
            mainReducerName: this.reduxModuleNamingHelper.getReducerMethodName(
                stateInfo,
                "main"
            ),
            extendedReducerName: this.reduxModuleNamingHelper.getReducerMethodName(
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
            getDefaultStateMethodName: this.reduxModuleNamingHelper.getGetDefaultStateMethodName(
                stateInfo,
                "main"
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
            arrayActionEnumValues: this.reduxModuleNamingHelper.getArrayActionStrings(
                propertyInfo,
                stateInfo
            ),
            initialValue: this.stateService.getInitialPropertyValue(
                propertyInfo
            ),
            types: propertyInfo.types,
            nullable: propertyInfo.nullable,
            undefineable: propertyInfo.undefineable,
            isArray:
                typeof propertyInfo.arrayElementType === "string" &&
                propertyInfo.types.length === 1 &&
                propertyInfo.types[0] === STATE_PROPERT_TYPES.ARRAY,
            arrayElementType: propertyInfo.arrayElementType,
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

    createHandlebarModel(
        stateInfo: StateInterfaceInfo
    ): TemplateHandlebarModel {
        return {
            options: this.options,
            featureName: {
                asIs: stateInfo.featureData.featureName,
                pascalCase: this.stringHelper.toPascalCased(
                    stateInfo.featureData.featureName
                ),
                camelCase: this.stringHelper.toCamelCased(
                    stateInfo.featureData.featureName
                ),
            },
            reducer: this.createReducerHandlebarModel(stateInfo),
            reducerActions: this.createReducerActionsHandlebarModel(stateInfo),
            actions: this.createActionsHandlebarModel(stateInfo),
            actionCreators: this.createActionCreatorsHandlebarModel(stateInfo),
            moduleNames: this.createModuleNamesHandlebarModel(),
            state: this.createStateHandlebarModel(stateInfo),
        };
    }
}

export const createTestFactory = (): TemplateModelFactory => {
    return new TemplateModelFactory(
        new ReduxModuleNamingHelper({ addFeatureAsActionPrefix: true }),
        new ReduxModulFileService({}),
        {
            addBubbleFlagForActions: true,
            createReducerContext: true,
            addArrayFunctions: true,
            decoupleStateChangedCallbackByTimeout: false,
        }
    );
};
