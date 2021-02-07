import {
    doBindPrototype,
    StringHelper,
} from "@derfrodo/frodo-s-little-helpers";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import ReduxModuleNamingHelper from "../ReduxModuleNamingHelper";
import ReduxModulFileService from "../ReduxModulFileService";
import { ReducerActionCodesGenerator } from "./ReducerActionCodesGenerator";
import { ReducerContextCodesGenerator } from "./ReducerContextCodesGenerator";
import { StateService } from "./StateService";

export class IndexCodeGenerator {
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
        )
    ) {
        doBindPrototype(this, IndexCodeGenerator.prototype);
    }

    generateMainIndexContent(stateInfo: StateInterfaceInfo): string {
        const reducerName = this.reduxModuleNamingHelper.getReducerMethodName(
            stateInfo,
            "main"
        );
        const reducerActionsName = this.reducerActionCodesGenerator.getReducerActionName(
            stateInfo,
            "main"
        );
        const actionsEnumName = this.reduxModuleNamingHelper.getActionEnumName(
            stateInfo,
            "main"
        );
        const actionCreatorsName = this.reduxModuleNamingHelper.getActionCreatorsName(
            stateInfo,
            "main"
        );

        const reducerContextLine = !this.options.createReducerContext
            ? ""
            : `export * from "./${
                  this.fileService.getMainModulNames().reducerContext
              }";
`;

        const stateImport = this.reduxModuleNamingHelper.getStateInterfaceImportLine(
            stateInfo
        );
        const stateName = this.reduxModuleNamingHelper.getStateInterfaceName(
            stateInfo
        );

        return `import { ${reducerActionsName} as RAs } from "./reducerActions/${
            this.fileService.getMainModulNames().reducerActions
        }";
${stateImport}

export { ${reducerName} } from "./reducer/${
            this.fileService.getMainModulNames().reducer
        }";
export { ${actionsEnumName} } from "./actions/${
            this.fileService.getMainModulNames().action
        }";
export { ${this.reduxModuleNamingHelper.getActionEnumName(
            stateInfo,
            "ext"
        )} } from "./actions/${
            this.fileService.getExtensionModulNames().action
        }";
export { ${this.reduxModuleNamingHelper.getActionEnumName(
            stateInfo,
            "base"
        )} } from "./actions/${
            this.fileService.getGeneratedModulNames().action
        }";
export { ${actionCreatorsName} } from "./actionCreators/${
            this.fileService.getMainModulNames().actionCreators
        }";
${reducerContextLine}

export { is${reducerActionsName} } from "./reducerActions/${
            this.fileService.getMainModulNames().reducerActions
        }";
export { is${this.reducerActionCodesGenerator.getReducerActionName(
            stateInfo,
            "ext"
        )} } from "./reducerActions/${
            this.fileService.getExtensionModulNames().reducerActions
        }";
export { is${this.reducerActionCodesGenerator.getReducerActionName(
            stateInfo,
            "base"
        )} } from "./reducerActions/${
            this.fileService.getGeneratedModulNames().reducerActions
        }";

export type ${reducerActionsName} = RAs;
export type ${this.reduxModuleNamingHelper.getPascalCasedFeatureName(
            stateInfo
        )}State = ${stateName};

`;
    }
}

