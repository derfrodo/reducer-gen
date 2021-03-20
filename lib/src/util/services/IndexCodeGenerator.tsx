import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers";
import ReduxCodeGeneratorOptions from "../../interfaces/ReduxCodeGeneratorOptions";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import { TemplatingEngine } from "../../templating/TemplatingEngine";
import { ModelFactory } from "./ModelFactory";

export class IndexCodeGenerator {
    constructor(
        private options: ReduxCodeGeneratorOptions,
        private modelFactory: ModelFactory,
        private templatingEngine: TemplatingEngine
    ) {
        doBindPrototype(this, IndexCodeGenerator.prototype);
    }

    generateMainIndexContent(stateInfo: StateInterfaceInfo): string {
        return this.templatingEngine.compile(
            this.templatingEngine.rootTemplates.indexMain,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }
}
