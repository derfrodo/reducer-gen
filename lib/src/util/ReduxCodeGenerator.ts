import { BindToClass, StringHelper } from "@derfrodo/frodo-s-little-helpers";
import log from "loglevel";
import GeneratedReduxStateData from "../interfaces/GeneratedReduxStateData";
import ReduxCodeGeneratorOptions from "../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo, {
    StatePropertyInfo,
} from "../interfaces/StateInterfaceInfo";
import ReduxModuleNamingHelper from "./ReduxModuleNamingHelper";
import ReduxModulFileService from "./ReduxModulFileService";
import { IndexCodeGenerator } from "./services/IndexCodeGenerator";
import { ReducerActionCodesGenerator } from "./services/ReducerActionCodesGenerator";
import { ReducerContextCodesGenerator } from "./services/ReducerContextCodesGenerator";
import { StateService } from "./services/StateService";

@BindToClass()
export class ReduxCodeGenerator {
    constructor(
        private options: ReduxCodeGeneratorOptions,
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private fileService: ReduxModulFileService,
        private stringHelper: StringHelper = new StringHelper(),
        private stateService: StateService = new StateService(),
        private reducerActionCodesGenerator: ReducerActionCodesGenerator = new ReducerActionCodesGenerator(
            options,
            reduxModuleNamingHelper,
            fileService
        ),
        private reducerContextCodesGenerator: ReducerContextCodesGenerator = new ReducerContextCodesGenerator(
            options,
            reduxModuleNamingHelper,
            fileService,
            stringHelper
        ),
        private indexCodeGenerator = new IndexCodeGenerator(
            options,
            reduxModuleNamingHelper,
            fileService,
            stringHelper
        )
    ) {}

    async generateStateCodes(
        stateInfo: StateInterfaceInfo[]
    ): Promise<GeneratedReduxStateData[]> {
        return Promise.all(stateInfo.map(this.generateFromStateInfo));
    }

    async generateFromStateInfo(
        stateInfo: StateInterfaceInfo
    ): Promise<GeneratedReduxStateData> {
        const { addGeneratedHeader } = this.reduxModuleNamingHelper;
        const result: GeneratedReduxStateData = {
            generatedBaseCodes: {
                actionCreators: addGeneratedHeader(
                    this.generateBaseActionsCreatorContent(stateInfo)
                ),
                actions: addGeneratedHeader(
                    this.generateBaseActionContent(stateInfo)
                ),
                reducerActions: addGeneratedHeader(
                    this.generateBaseReducerActionContent(stateInfo)
                ),
                reducer: addGeneratedHeader(
                    this.generateBaseReducerContent(stateInfo)
                ),
                defaultState: addGeneratedHeader(
                    this.generateDefaultStateContent(stateInfo)
                ),
            },
            generatedExtendedCodes: {
                actionCreators: addGeneratedHeader(
                    this.generateExtActCreatorContent(stateInfo),
                    true
                ),
                actions: addGeneratedHeader(
                    this.generateExtActionContent(stateInfo),
                    true
                ),
                reducerActions: addGeneratedHeader(
                    this.generateExtReducerActionContent(stateInfo),
                    true
                ),
                reducer: addGeneratedHeader(
                    this.generateExtReducerContent(stateInfo),
                    true
                ),
            },
            generatedMainCodes: {
                actionCreators: addGeneratedHeader(
                    this.generateMainActionsCreatorContent(stateInfo)
                ),
                actions: addGeneratedHeader(
                    this.generateMainActionContent(stateInfo)
                ),
                reducerActions: addGeneratedHeader(
                    this.generateMainReducerActionContent(stateInfo)
                ),
                reducer: addGeneratedHeader(
                    this.generateMainReducerContent(stateInfo)
                ),
                index: addGeneratedHeader(
                    this.generateMainIndexContent(stateInfo)
                ),
                reducerContext: addGeneratedHeader(
                    this.generateMainReducerContextContent(stateInfo)
                ),
            },
            generatedIndexCode: addGeneratedHeader(
                this.generateIndexContent(stateInfo)
            ),
            featureData: stateInfo.featureData,
            stateInfo: stateInfo,
        };

        log.debug("Generated redux state", result);
        return result;
    }

    getImportClauses(
        stateInfo: StateInterfaceInfo,
        asNested = true,
        asComment = false
    ): string {
        const { importClauses } = stateInfo;
        return asNested
            ? `${importClauses
                  .map(this.fileService.addLevelToImportClause)
                  .map((clause) =>
                      asComment
                          ? this.fileService.addCommentToImportClause(clause)
                          : clause
                  )
                  .join("\n")}`
            : `${importClauses.join("\n")}`;
    }

    getStateInterfaceName(stateInfo: StateInterfaceInfo): string {
        return this.reduxModuleNamingHelper.getStateInterfaceName(stateInfo);
    }

    // Central Index
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    generateIndexContent(stateInfo: StateInterfaceInfo): string {
        return `export * from "./${this.fileService.getMainModulNames().index}";
`;
    }

    // Main Elements
    generateMainActionsCreatorContent(stateInfo: StateInterfaceInfo): string {
        const actionsCreatorNameBase = this.reduxModuleNamingHelper.getActionCreatorsName(
            stateInfo,
            "base"
        );
        const actionsCreatorNameExt = this.reduxModuleNamingHelper.getActionCreatorsName(
            stateInfo,
            "ext"
        );
        const actionsCreatorName = this.reduxModuleNamingHelper.getActionCreatorsName(
            stateInfo,
            "main"
        );

        const actionCreatorObjectName = this.reduxModuleNamingHelper.getActionCreatorsName(
            stateInfo,
            "main"
        );

        return `import ${actionsCreatorNameBase} from "./${
            this.fileService.getGeneratedModulNames().actionCreators
        }";
import ${actionsCreatorNameExt} from "./${
            this.fileService.getExtensionModulNames().actionCreators
        }";

export const ${actionsCreatorName} = { ...${actionsCreatorNameBase}, ...${actionsCreatorNameExt} }

export default ${actionCreatorObjectName}`;
    }

    generateMainActionContent(stateInfo: StateInterfaceInfo): string {
        const actionsEnumNameBase = this.reduxModuleNamingHelper.getActionEnumName(
            stateInfo,
            "base"
        );
        const actionsEnumNameExt = this.reduxModuleNamingHelper.getActionEnumName(
            stateInfo,
            "ext"
        );
        const actionsEnumName = this.reduxModuleNamingHelper.getActionEnumName(
            stateInfo,
            "main"
        );

        return `import ${actionsEnumNameBase} from "./${
            this.fileService.getGeneratedModulNames().action
        }";
import ${actionsEnumNameExt} from "./${
            this.fileService.getExtensionModulNames().action
        }";
        
export const ${actionsEnumName} = { ...${actionsEnumNameBase}, ...${actionsEnumNameExt} };

export default ${actionsEnumName}`;
    }

    generateMainReducerContent(stateInfo: StateInterfaceInfo): string {
        const nameBase = this.reduxModuleNamingHelper.getReducerMethodName(
            stateInfo,
            "base"
        );
        const nameExt = this.reduxModuleNamingHelper.getReducerMethodName(
            stateInfo,
            "ext"
        );
        const name = this.reduxModuleNamingHelper.getReducerMethodName(
            stateInfo,
            "main"
        );

        const stateName = this.getStateInterfaceName(stateInfo);
        const stateImport = this.reduxModuleNamingHelper.getStateInterfaceImportLine(
            stateInfo,
            { pathToState: "./../state" }
        );

        const methodBase = this.reducerActionCodesGenerator.getReducerActionTypeGuardMethodName(
            stateInfo,
            "base"
        );

        const reducerActionsName = this.reducerActionCodesGenerator.getReducerActionName(
            stateInfo,
            "main"
        );
        const { defaultState } = this.fileService.getGeneratedModulNames();
        const { reducerActions } = this.fileService.getMainModulNames();

        return `import ${nameBase} from "./${
            this.fileService.getGeneratedModulNames().reducer
        }";
import ${nameExt} from "./${this.fileService.getExtensionModulNames().reducer}";
import { ${methodBase} } from "./../reducerActions/${
            this.fileService.getGeneratedModulNames().reducerActions
        }";
${stateImport}
import getDefaultState from "./../${defaultState}";
import ${reducerActionsName} from "./../reducerActions/${reducerActions}";
        
export const ${name} = (state: ${stateName} = getDefaultState(), action:  ${reducerActionsName}): ${stateName} => {
    // Note: Generator may be extended to inversify this order => Just talk to me ;)
    // return ${nameExt}((${methodBase}(action) ? ${nameBase}(state, action) : state), action);
    
    return (${methodBase}(action) ? ${nameBase}(${nameExt}(state, action), action) : ${nameExt}(state, action));
}

export default ${name};
`;
    }

    generateMainReducerActionContent(stateInfo: StateInterfaceInfo): string {
        return this.reducerActionCodesGenerator.generateMainReducerActionContent(
            stateInfo
        );
    }

    generateMainIndexContent(stateInfo: StateInterfaceInfo): string {
        return this.indexCodeGenerator.generateMainIndexContent(stateInfo);
    }

    generateMainReducerContextContent(stateInfo: StateInterfaceInfo): string {
        return this.reducerContextCodesGenerator.generateReducerContextContent(
            stateInfo
        );
    }

    // Base Elements
    generateBaseActionsCreatorContent(stateInfo: StateInterfaceInfo): string {
        const {
            reducerActions,
            action,
        } = this.fileService.getGeneratedModulNames();

        const actionCreatorObjectName = this.reduxModuleNamingHelper.getActionCreatorsName(
            stateInfo,
            "base"
        );

        return `${this.getImportClauses(stateInfo)}
import ReducerAction from "./../reducerActions/${reducerActions}";
import actions from "./../actions/${action}";

export const ${actionCreatorObjectName} = {
${stateInfo.stateProperties
    .map((p) => {
        const propertyPascalCased = p.name.replace(/(?<=^)[a-z]/, (mtch) =>
            mtch.toUpperCase()
        );
        return `    set${propertyPascalCased}: (next${propertyPascalCased}: ${
            p.typesText
        }): ReducerAction => (
        {
            type: actions.${this.reduxModuleNamingHelper.getActionString(
                p,
                stateInfo
            )},
            next: next${propertyPascalCased},
        }),`;
    })
    .join("\n")}        
}

export default ${actionCreatorObjectName};
`;
    }

    generateBaseActionContent(stateInfo: StateInterfaceInfo): string {
        const actionsEnumName = this.reduxModuleNamingHelper.getActionEnumName(
            stateInfo,
            "base"
        );
        return `export enum ${actionsEnumName} {
${this.reduxModuleNamingHelper
    .getActionStrings(stateInfo)
    .map(
        (a) => `    ${a} = "${a}",
`
    )
    .join("")}}

export default ${actionsEnumName};
`;
    }

    generateBaseReducerContent(stateInfo: StateInterfaceInfo): string {
        const {
            defaultState,
            reducerActions,
            action,
        } = this.fileService.getGeneratedModulNames();
        const stateName = this.getStateInterfaceName(stateInfo);
        const stateImport = this.reduxModuleNamingHelper.getStateInterfaceImportLine(
            stateInfo,
            { pathToState: "./../state" }
        );

        const reducerMethod = this.reduxModuleNamingHelper.getReducerMethodName(
            stateInfo,
            "base"
        );
        return `${stateImport}
import getDefaultState from "./../${defaultState}";
import ReducerAction from "./../reducerActions/${reducerActions}";
import actions from "./../actions/${action}";
            
const ${reducerMethod} = (state: ${stateName} = getDefaultState(), action: ReducerAction): ${stateName} => {
    switch (action.type) {
${stateInfo.stateProperties
    .map(
        (p) =>
            `       case actions.${this.reduxModuleNamingHelper.getActionString(
                p,
                stateInfo
            )}:
            return {
                ...state, 
                ${p.name}: action.next,
            };`
    )
    .join("\n")}        
        default:
            return state; 
    }
}


export default ${reducerMethod}`;
    }

    generateBaseReducerActionContent(stateInfo: StateInterfaceInfo): string {
        return this.reducerActionCodesGenerator.generateBaseReducerActionContent(
            stateInfo
        );
    }

    generateDefaultStateContent(stateInfo: StateInterfaceInfo): string {
        const defaultStateMethodName = this.reduxModuleNamingHelper.getGetDefaultStateMethodName(
            stateInfo,
            "main"
        );
        const stateName = this.getStateInterfaceName(stateInfo);
        const stateImport = this.reduxModuleNamingHelper.getStateInterfaceImportLine(
            stateInfo
        );
        return `${stateImport}
        
export const ${defaultStateMethodName} = (): ${stateName} => ({
${stateInfo.stateProperties
    .map((info) => {
        const { name } = info;
        return `    ${name}: ${this.getInitialPropertyValue(info)},
`;
    })
    .join("")}  
});

export default ${defaultStateMethodName}`;
    }

    // Ext Elements
    generateExtActCreatorContent(stateInfo: StateInterfaceInfo): string {
        const {
            reducerActions,
            action,
        } = this.fileService.getExtensionModulNames();

        /**
         * You may add here extending actionCreators for this features reducer
         */
        const actionCreatorObjectName = this.reduxModuleNamingHelper.getActionCreatorsName(
            stateInfo,
            "ext"
        );
        return `${this.getImportClauses(stateInfo, true, true)}
import ExtenedReducerAction from "./../reducerActions/${reducerActions}";
// import extendedActions from "./../actions/${action}";

/**
 * You may add here extending actionCreators for this features reducer
 * actionCreator: ([params]): ExtenedReducerAction => (
 * {
 *   type: extendedActions["[actionName]"],
 *   [payload]
 * }),
 * 
 */
export const extendedActionCreators = {}

type ActionCreator = { [key in string]: (...params: any[]) => ExtenedReducerAction };

const checkActionCreator: <T>(item: T & ActionCreator) => T = <T>(item: T & ActionCreator) => {
    return item;
};

export const ${actionCreatorObjectName} = checkActionCreator(extendedActionCreators);

export default ${actionCreatorObjectName};
`;
    }

    generateExtActionContent(stateInfo: StateInterfaceInfo): string {
        const actionsEnumName = this.reduxModuleNamingHelper.getActionEnumName(
            stateInfo,
            "ext"
        );

        return `export enum ${actionsEnumName} {
// e.g. SET_IS_LOGGED_IN_EXT = "SET_IS_LOGGED_IN_EXT",

}

export default ${actionsEnumName}`;
    }

    generateExtReducerActionContent(stateInfo: StateInterfaceInfo): string {
        return this.reducerActionCodesGenerator.generateExtReducerActionContent(
            stateInfo
        );
    }

    generateExtReducerContent(stateInfo: StateInterfaceInfo): string {
        const {
            defaultState,
            action: baseActions,
            reducerActions: baseReducerActions,
        } = this.fileService.getGeneratedModulNames();
        const {
            action,
            reducerActions: raExt,
        } = this.fileService.getExtensionModulNames();
        const { reducerActions } = this.fileService.getMainModulNames();

        const reducerActionsExtTestMethodName = this.reducerActionCodesGenerator.getReducerActionTypeGuardMethodName(
            stateInfo,
            "ext"
        );

        const reducerActionsTestMethodName = this.reducerActionCodesGenerator.getReducerActionTypeGuardMethodName(
            stateInfo,
            "base"
        );
        const reducerActionsName = this.reducerActionCodesGenerator.getReducerActionName(
            stateInfo,
            "main"
        );

        const reducerMethod = this.reduxModuleNamingHelper.getReducerMethodName(
            stateInfo,
            "ext"
        );
        const stateName = this.getStateInterfaceName(stateInfo);
        const stateImport = this.reduxModuleNamingHelper.getStateInterfaceImportLine(
            stateInfo,
            { pathToState: "./../state" }
        );
        return `${stateImport}
import getDefaultState from "./../${defaultState}";
// import extendedActions from "./../actions/${action}";
// import actions from "./../actions/${baseActions}";
import ${reducerActionsName} from "./../reducerActions/${reducerActions}";
    
// Uncomment for some typechecking:
// import { ${reducerActionsTestMethodName} } from "./../reducerActions/${baseReducerActions}";
// import { ${reducerActionsExtTestMethodName} } from "./../reducerActions/${raExt}";

/**
 * You may add here extending reducer behaviors for this features reducer
 */        
const ${reducerMethod} = (state: ${stateName} = getDefaultState(), action: ${reducerActionsName} ): ${stateName} => {
    switch (action.type) {
//         case actions["[actionName]"]:
//             return {
//                 ...state, 
//                 // [action payload]
//            };  
//         case extendedActions["[actionName]"]:
//             return {
//                 ...state, 
//                 // [action payload]
//              };  
        default:
            return state; 
    }
};

export default ${reducerMethod};
`;
    }

    // Cool methods
    getInitialPropertyValue(info: StatePropertyInfo): string {
        return this.stateService.getInitialPropertyValue(info);
    }
}
