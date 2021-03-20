import { BindToClass, StringHelper } from "@derfrodo/frodo-s-little-helpers";
import log from "loglevel";
import GeneratedReduxStateData from "../interfaces/GeneratedReduxStateData";
import ReduxCodeGeneratorOptions from "../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo, {
    StatePropertyInfo,
} from "../interfaces/StateInterfaceInfo";
import { TemplatingEngine } from "../templating/TemplatingEngine";
import ReduxModuleNamingHelper from "./ReduxModuleNamingHelper";
import ReduxModulFileService from "./ReduxModulFileService";
import { IndexCodeGenerator } from "./services/IndexCodeGenerator";
import { ModelFactory } from "./services/ModelFactory";
import { ReducerActionCodesGenerator } from "./services/ReducerActionCodesGenerator";
import { ReducerContextCodesGenerator } from "./services/ReducerContextCodesGenerator";
import { StateService } from "./services/StateService";

@BindToClass()
export class ReduxCodeGenerator {
    constructor(
        private options: ReduxCodeGeneratorOptions,
        private stringHelper: StringHelper = new StringHelper(),
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private fileService: ReduxModulFileService,
        private modelFactory: ModelFactory = new ModelFactory(
            reduxModuleNamingHelper,
            fileService,
            options,
            stringHelper
        ),
        private templatingEngine: TemplatingEngine = new TemplatingEngine(),
        private stateService: StateService = new StateService(),
        private reducerActionCodesGenerator: ReducerActionCodesGenerator = new ReducerActionCodesGenerator(
            options,
            modelFactory,
            templatingEngine
        ),
        private reducerContextCodesGenerator: ReducerContextCodesGenerator = new ReducerContextCodesGenerator(
            options,
            reduxModuleNamingHelper,
            fileService,
            stringHelper
        ),
        private indexCodeGenerator = new IndexCodeGenerator(
            options,
            modelFactory,
            templatingEngine
        )
    ) {}
    initialize(): Promise<void> {
        return this.templatingEngine.initialize();
    }

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
        return this.templatingEngine.compile(
            this.templatingEngine.actionCreatorsTemplates.main,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }

    generateMainActionContent(stateInfo: StateInterfaceInfo): string {
        return this.templatingEngine.compile(
            this.templatingEngine.actionsTemplates.main,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
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

        const methodBase = this.reduxModuleNamingHelper.getReducerActionTypeGuardMethodName(
            stateInfo,
            "base"
        );

        const reducerActionsName = this.reduxModuleNamingHelper.getReducerActionName(
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
        return this.templatingEngine.compile(
            this.templatingEngine.actionCreatorsTemplates.base,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }

    generateBaseActionContent(stateInfo: StateInterfaceInfo): string {
        return this.templatingEngine.compile(
            this.templatingEngine.actionsTemplates.base,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }

    generateBaseReducerContent(stateInfo: StateInterfaceInfo): string {
        const {
            defaultState,
            reducerActions,
            actions: action,
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
        return this.templatingEngine.compile(
            this.templatingEngine.actionCreatorsTemplates.extended,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }

    generateExtActionContent(stateInfo: StateInterfaceInfo): string {
        return this.templatingEngine.compile(
            this.templatingEngine.actionsTemplates.extended,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }

    generateExtReducerActionContent(stateInfo: StateInterfaceInfo): string {
        return this.reducerActionCodesGenerator.generateExtReducerActionContent(
            stateInfo
        );
    }

    generateExtReducerContent(stateInfo: StateInterfaceInfo): string {
        const {
            defaultState,
            actions: baseActions,
            reducerActions: baseReducerActions,
        } = this.fileService.getGeneratedModulNames();
        const {
            actions: action,
            reducerActions: raExt,
        } = this.fileService.getExtensionModulNames();
        const { reducerActions } = this.fileService.getMainModulNames();

        const reducerActionsExtTestMethodName = this.reduxModuleNamingHelper.getReducerActionTypeGuardMethodName(
            stateInfo,
            "ext"
        );

        const reducerActionsTestMethodName = this.reduxModuleNamingHelper.getReducerActionTypeGuardMethodName(
            stateInfo,
            "base"
        );
        const reducerActionsName = this.reduxModuleNamingHelper.getReducerActionName(
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
