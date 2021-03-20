import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import ReduxModuleNamingHelper from "./../ReduxModuleNamingHelper";
import ReduxModulFileService from "./../ReduxModulFileService";

export class ReducerActionCodesGenerator {
    constructor(
        private options: ReduxCodeGeneratorOptions,
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private fileService: ReduxModulFileService
    ) {
        doBindPrototype(this, ReducerActionCodesGenerator.prototype);
    }

    getImportClauses(
        stateInfo: StateInterfaceInfo,
        asNested = true,
        asComment = false
    ): string {
        const { importClauses } = stateInfo;
        return asNested
            ? `${importClauses
                  .map((clause) =>
                      asComment
                          ? this.fileService.addCommentToImportClause(clause)
                          : clause
                  )
                  .map(this.fileService.addLevelToImportClause)
                  .join("\n")}`
            : `${importClauses.join("\n")}`;
    }

    // Main Elements
    generateMainReducerActionContent(stateInfo: StateInterfaceInfo): string {
        const nameBase = this.getReducerActionName(stateInfo, "base");
        const nameExt = this.getReducerActionName(stateInfo, "ext");
        const name = this.getReducerActionName(stateInfo, "main");

        const methodBase = this.getReducerActionTypeGuardMethodName(
            stateInfo,
            "base"
        );
        const methodExt = this.getReducerActionTypeGuardMethodName(
            stateInfo,
            "ext"
        );
        const method = this.getReducerActionTypeGuardMethodName(
            stateInfo,
            "main"
        );

        return `import ${nameBase}, { ${methodBase} } from "./${
            this.fileService.getGeneratedModulNames().reducerActions
        }";
import ${nameExt}, { ${methodExt} } from "./${
            this.fileService.getExtensionModulNames().reducerActions
        }";

export type ${name} = ${nameBase} | ${nameExt};

export const ${method} = (item: any): item is ${name} => {
    return ${methodBase}(item) || ${methodExt}(item);
}

export default ${name};
`;
    }

    // Base Elements
    generateBaseReducerActionContent(stateInfo: StateInterfaceInfo): string {
        const { addBubbleFlagForActions } = this.options;
        const reducerActionsName = this.getReducerActionName(stateInfo, "base");
        const reducerActionsTestMethodName = this.getReducerActionTypeGuardMethodName(
            stateInfo,
            "base"
        );
        const { actions: action } = this.fileService.getGeneratedModulNames();

        return `${this.getImportClauses(stateInfo)}
import actions from "./../actions/${action}";
        
export type ${reducerActionsName} = { type: actions${
            addBubbleFlagForActions ? "; isBubbled?: boolean" : ""
        } } & (
${stateInfo.stateProperties
    .map(
        (p) => `   | {
        type: actions.${this.reduxModuleNamingHelper.getActionString(
            p,
            stateInfo
        )};
        next: ${p.typesText};
    }`
    )
    .join("")}
);

export const ${reducerActionsTestMethodName} = (item: any): item is ${reducerActionsName} => {
    if (!item) { return false; }
    if (typeof item === "object") {
        const { type } = item;

        return typeof type === "string" && actions.hasOwnProperty(type);
    }
    return false;
}

export default ${reducerActionsName}`;
    }

    // Ext Elements
    generateExtReducerActionContent(stateInfo: StateInterfaceInfo): string {
        const { addBubbleFlagForActions } = this.options;
        const reducerActionsName = this.getReducerActionName(stateInfo, "ext");
        const reducerActionsTestMethodName = this.getReducerActionTypeGuardMethodName(
            stateInfo,
            "ext"
        );

        const { actions: action } = this.fileService.getExtensionModulNames();

        return `${this.getImportClauses(stateInfo, true, true)}
import extenededActions from "./../actions/${action}";
        
/**
 * You may add here extending reducer actions for this features reducer
 */        
export type ${reducerActionsName} = { type: extenededActions${
            addBubbleFlagForActions ? "; isBubbled?: boolean" : ""
        } } & (
    | {} // replace by following template for every extenededActions
//    | {
//        type: extenededActions["[action name]"];
//        /* [additional payload like : next:  boolean;]*/
//    }
);

export const ${reducerActionsTestMethodName} = (item: any): item is ${reducerActionsName} => {
    if (!item) { return false; }
    if (typeof item === "object") {
        const { type } = item;

        return typeof type === "string" && extenededActions.hasOwnProperty(type);
    }
    return false;
}

export default ${reducerActionsName};
`;
    }

    // Cool methods
    getReducerActionName(
        stateInfo: StateInterfaceInfo,
        modul: "main" | "base" | "ext"
    ): string {
        return this.reduxModuleNamingHelper.getReducerActionName(
            stateInfo,
            modul
        );
    }

    getReducerActionTypeGuardMethodName(
        stateInfo: StateInterfaceInfo,
        modul: "main" | "base" | "ext"
    ): string {
        return this.reduxModuleNamingHelper.getReducerActionTypeGuardMethodName(
            stateInfo,
            modul
        );
    }
}
