import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import { TemplatingEngine } from "../../templating/TemplatingEngine";
import { TemplateModelFactory } from "./TemplateModelFactory";

export class ReducerActionCodesGenerator {
    constructor(
        private options: ReduxCodeGeneratorOptions,
        private modelFactory: TemplateModelFactory,
        private templatingEngine: TemplatingEngine
    ) {
        doBindPrototype(this, ReducerActionCodesGenerator.prototype);
    }

    generateMainReducerActionContent(stateInfo: StateInterfaceInfo): string {
        return this.templatingEngine.compile(
            this.templatingEngine.reducerActionsTemplates.main,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }

    generateBaseReducerActionContent(stateInfo: StateInterfaceInfo): string {
        return this.templatingEngine.compile(
            this.templatingEngine.reducerActionsTemplates.base,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }

    generateExtReducerActionContent(stateInfo: StateInterfaceInfo): string {
        return this.templatingEngine.compile(
            this.templatingEngine.reducerActionsTemplates.extended,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }
}
