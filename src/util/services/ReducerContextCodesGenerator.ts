import {
    doBindPrototype,
    StringHelper,
} from "@derfrodo/frodo-s-little-helpers";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import ReduxModuleNamingHelper from "../ReduxModuleNamingHelper";
import ReduxModulFileService from "../ReduxModulFileService";

export class ReducerContextCodesGenerator {
    constructor(
        private options: ReduxCodeGeneratorOptions,
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private fileService: ReduxModulFileService,
        private stringHelper: StringHelper = new StringHelper()
    ) {
        doBindPrototype(this, ReducerContextCodesGenerator.prototype);
    }

    getStateInterfaceName(stateInfo: StateInterfaceInfo): string {
        return this.reduxModuleNamingHelper.getStateInterfaceName(stateInfo);
    }

    generateReducerContextContent(stateInfo: StateInterfaceInfo): string {
        const reducerName = this.getReducerMethodName(stateInfo, "main");
        const defaultStateMethodName = this.getGetDefaultStateMethodName(
            stateInfo,
            "main"
        );

        const { defaultState } = this.fileService.getGeneratedModulNames();
        const {
            reducer: reducerModuleName,
            reducerActions: reducerActionsModuleName,
        } = this.fileService.getMainModulNames();
        const reducerActionsName = this.getReducerActionName(stateInfo, "main");
        const stateName = this.getStateInterfaceName(stateInfo);
        const reducerContextName = `${this.stringHelper.toPascalCased(
            reducerName
        )}Context`;

        return `import React from "react";
import ${stateName} from "./state";
import ${reducerName} from "./reducer/${reducerModuleName}";
import ${reducerActionsName} from "./reducerActions/${reducerActionsModuleName}";
import ${defaultStateMethodName} from "./${defaultState}";

export interface I${reducerContextName} {
    state: ${stateName};
    dispatch: React.Dispatch<${reducerActionsName}>;
}

export type IDispatch${reducerContextName} = React.Dispatch<${reducerActionsName}>;

export type IState${reducerContextName} = ${stateName};

export const ${reducerContextName} = React.createContext<I${reducerContextName}>({
    state: ${defaultStateMethodName}(),
    dispatch: () => undefined,
});

export const Dispatch${reducerContextName} = React.createContext<IDispatch${reducerContextName}>(() => undefined);

export const State${reducerContextName} = React.createContext<IState${reducerContextName}>(${defaultStateMethodName}());

${this.generateReducerContextProviderContent(stateInfo)}
${this.generateReducerContextHooksContent(stateInfo)}`;
    }

    generateReducerContextProviderContent(
        stateInfo: StateInterfaceInfo
    ): string {
        const reducerName = this.getReducerMethodName(stateInfo, "main");
        const defaultStateMethodName = this.getGetDefaultStateMethodName(
            stateInfo,
            "main"
        );

        const reducerActionsName = this.getReducerActionName(stateInfo, "main");
        const stateName = this.getStateInterfaceName(stateInfo);
        const reducerContextName = `${this.stringHelper.toPascalCased(
            reducerName
        )}Context`;

        return `export const ${reducerContextName}Provider = (props: {
    children: React.ReactNode;
}) => {
    const { children } = props;

    const [state, dispatch] = React.useReducer(
    ${reducerName},
    undefined,
    ${defaultStateMethodName}
    );

    const context: {
    state: ${stateName};
    dispatch: React.Dispatch<${reducerActionsName}>;
    } = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
    <Dispatch${reducerContextName}.Provider value={dispatch}>
        <State${reducerContextName}.Provider value={state}>
            <${reducerContextName}.Provider value={context}>
                {children}
            </${reducerContextName}.Provider>
        </State${reducerContextName}.Provider>
    </Dispatch${reducerContextName}.Provider>
    );
};
`;
    }

    generateReducerContextHooksContent(stateInfo: StateInterfaceInfo): string {
        const reducerName = this.getReducerMethodName(stateInfo, "main");
        const reducerContextName = `${this.stringHelper.toPascalCased(
            reducerName
        )}Context`;

        return `export const use${reducerContextName}: () => I${reducerContextName} = () => {
    return React.useContext<I${reducerContextName}>(${reducerContextName});
};

export const use${reducerContextName}State: () => IState${reducerContextName} = () => {
    return React.useContext<IState${reducerContextName}>(State${reducerContextName});
};

export const use${reducerContextName}Dispatch: () => IDispatch${reducerContextName} = () => {
    return React.useContext<IDispatch${reducerContextName}>(Dispatch${reducerContextName});
};
`;
    }

    // Cool methods
    private getGetDefaultStateMethodName(
        stateInfo: StateInterfaceInfo,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        modul: "main" | "base" | "ext"
    ): string {
        return this.reduxModuleNamingHelper.getGetDefaultStateMethodName(
            stateInfo,
            modul
        );
    }

    private getReducerMethodName(
        stateInfo: StateInterfaceInfo,
        modul: "main" | "base" | "ext"
    ): string {
        return this.reduxModuleNamingHelper.getReducerMethodName(
            stateInfo,
            modul
        );
    }

    private getReducerActionName(
        stateInfo: StateInterfaceInfo,
        modul: "main" | "base" | "ext"
    ): string {
        return this.reduxModuleNamingHelper.getReducerActionName(
            stateInfo,
            modul
        );
    }
}
