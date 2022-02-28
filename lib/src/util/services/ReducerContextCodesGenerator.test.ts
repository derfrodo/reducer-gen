import {
    StatePropertyInfo,
    STATE_PROPERT_TYPES,
} from "../../interfaces/StateInterfaceInfo";
import { ReducerContextCodesGenerator } from "./ReducerContextCodesGenerator";

import { TemplatingEngine } from "../../templating/TemplatingEngine";
import { TemplateModelFactory } from "./TemplateModelFactory";

jest.mock("../../templating/TemplatingEngine");
jest.mock("./TemplateModelFactory");

describe("ReducerContextCodesGenerator tests", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("generateReducerContextContent uses model factory", () => {
        // mocked factory :)
        const factory = new (TemplateModelFactory as any)();
        const templatingEngine = new TemplatingEngine();
        const testoptions = {
            addArrayFunctions: false,
            createReducerContext: false,
            decoupleStateChangedCallbackByTimeout: false,
        };
        // mocked factory - remember? 😅
        templatingEngine.contextTemplates = { context: "TESTCONTEXT" };

        const uut = new ReducerContextCodesGenerator(
            testoptions,
            factory,
            templatingEngine
        );

        uut.generateReducerContextContent("TESTSTATEINFO" as any);

        expect(factory.createHandlebarModel).toBeCalledTimes(1);
        expect(factory.createHandlebarModel).toBeCalledWith("TESTSTATEINFO");
    });

    it("generateReducerContextContent uses engine", () => {
        // mocked factory :)
        const factory = new (TemplateModelFactory as any)();
        const templatingEngine = new TemplatingEngine();
        const testoptions = {
            addArrayFunctions: false,
            createReducerContext: false,
            decoupleStateChangedCallbackByTimeout: false,
        };
        // mocked factory - remember? 😅
        templatingEngine.contextTemplates = { context: "TESTCONTEXT" };

        factory.createHandlebarModel.mockImplementation(() => "HANDLEBARMODEL");

        const uut = new ReducerContextCodesGenerator(
            testoptions,
            factory,
            templatingEngine
        );

        uut.generateReducerContextContent("TESTSTATEINFO" as any);

        expect(templatingEngine.compile).toBeCalledTimes(1);
        expect(templatingEngine.compile).toBeCalledWith(
            "TESTCONTEXT",
            "HANDLEBARMODEL"
        );
    });
});
