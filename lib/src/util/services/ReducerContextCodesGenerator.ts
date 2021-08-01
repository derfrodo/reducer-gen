import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import { TemplatingEngine } from "../../templating/TemplatingEngine";
import { TemplateModelFactory } from "./TemplateModelFactory";

export class ReducerContextCodesGenerator {
    constructor(
        private options: ReduxCodeGeneratorOptions,
        private modelFactory: TemplateModelFactory,
        private templatingEngine: TemplatingEngine
    ) {
        doBindPrototype(this, ReducerContextCodesGenerator.prototype);
    }

    generateReducerContextContent(stateInfo: StateInterfaceInfo): string {
        return this.templatingEngine.compile(
            this.templatingEngine.contextTemplates.context,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }
}
