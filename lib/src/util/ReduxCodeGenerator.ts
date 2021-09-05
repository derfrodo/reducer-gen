import { BindToClass, StringHelper } from "@derfrodo/frodo-s-little-helpers";
import log from "loglevel";
import type { GeneratedReduxStateData } from "../interfaces/GeneratedReduxStateData";
import type { ReduxCodeGeneratorOptions } from "../interfaces/ReduxCodeGeneratorOptions";
import type { StateInterfaceInfo } from "../interfaces/StateInterfaceInfo";
import { TemplatingEngine } from "../templating/TemplatingEngine";
import { ReduxModuleNamingHelper } from "./ReduxModuleNamingHelper";
import { ReduxModulFileService } from "./ReduxModulFileService";
import { IndexCodeGenerator } from "./services/IndexCodeGenerator";
import { TemplateModelFactory } from "./services/TemplateModelFactory";
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
        private modelFactory: TemplateModelFactory = new TemplateModelFactory(
            reduxModuleNamingHelper,
            fileService,
            options,
            new StateService(),
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
            modelFactory,
            templatingEngine
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

    // Central Index
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    generateIndexContent(stateInfo: StateInterfaceInfo): string {
        return this.templatingEngine.compile(
            this.templatingEngine.rootTemplates.index,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
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
        return this.templatingEngine.compile(
            this.templatingEngine.reducerTemplates.main,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
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
        return this.templatingEngine.compile(
            this.templatingEngine.reducerTemplates.base,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }

    generateBaseReducerActionContent(stateInfo: StateInterfaceInfo): string {
        return this.reducerActionCodesGenerator.generateBaseReducerActionContent(
            stateInfo
        );
    }

    generateDefaultStateContent(stateInfo: StateInterfaceInfo): string {
        return this.templatingEngine.compile(
            this.templatingEngine.rootTemplates.defaultState,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
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
        return this.templatingEngine.compile(
            this.templatingEngine.reducerTemplates.extended,
            this.modelFactory.createHandlebarModel(stateInfo)
        );
    }
}
