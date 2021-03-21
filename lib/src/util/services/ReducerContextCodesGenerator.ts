import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import { TemplatingEngine } from "../../templating/TemplatingEngine";
import { ModelFactory } from "./ModelFactory";

export class ReducerContextCodesGenerator {
    constructor(
        private options: ReduxCodeGeneratorOptions,
        private modelFactory: ModelFactory,
        private templatingEngine: TemplatingEngine
    ) {
        doBindPrototype(this, ReducerContextCodesGenerator.prototype);
    }

    generateReducerContextContent(stateInfo: StateInterfaceInfo): string {
        return `${this.templatingEngine.compile(
            this.templatingEngine.contextTemplates.boilerplate,
            this.modelFactory.createHandlebarModel(stateInfo)
        )}${this.templatingEngine.compile(
            this.templatingEngine.contextTemplates.context,
            this.modelFactory.createHandlebarModel(stateInfo)
        )}${this.templatingEngine.compile(
            this.templatingEngine.contextTemplates.contextHooks,
            this.modelFactory.createHandlebarModel(stateInfo)
        )}${this.templatingEngine.compile(
            this.templatingEngine.contextTemplates.contextChangedHooks,
            this.modelFactory.createHandlebarModel(stateInfo)
        )}
        `;
    }
}
