// Todo: Add some precompiling here
import handlebars from "handlebars";
import { readFile } from "fs";
import path from "path";
import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers/dist";
import { TemplateHandlebarModel } from "../util/models/TemplateHandlebarModel";

type FeatureTemplate = {
    main: string;
    extended: string;
    base: string;
};

const readTemplate = (filePath: string): Promise<string> =>
    new Promise((r, rej) =>
        readFile(
            filePath,
            {
                encoding: "utf8",
            },
            (err, data) => {
                if (err) {
                    rej(err);
                }
                r(data);
            }
        )
    );

type RootTemplates = {
    defaultState: string;
    index: string;
    indexMain: string;
};

type ContextTemplates = {
    boilerplate: string;
    context: string;
    contextHooks: string;
    contextChangedHooks: string;
};
export class TemplatingEngine {
    private _contextTemplates: ContextTemplates | undefined;
    private _rootTemplates: RootTemplates | undefined;
    private _actionsTemplates: FeatureTemplate | undefined;
    private _actionCreatorsTemplates: FeatureTemplate | undefined;
    private _reducerActionsTemplates: FeatureTemplate | undefined;
    private _reducerTemplates: FeatureTemplate | undefined;
    constructor() {
        doBindPrototype(this, TemplatingEngine.prototype);
    }

    public get contextTemplates(): Readonly<ContextTemplates> {
        if (!this._contextTemplates) {
            throw new Error(
                "Templates have not been initialized. Please call precompile method first."
            );
        } else {
            return { ...this._contextTemplates };
        }
    }
    public get rootTemplates(): Readonly<RootTemplates> {
        if (!this._rootTemplates) {
            throw new Error(
                "Root templates have not been initialized. Please call precompile method first."
            );
        } else {
            return { ...this._rootTemplates };
        }
    }

    public get actionsTemplates(): Readonly<FeatureTemplate> {
        if (!this._actionsTemplates) {
            throw new Error(
                "Actions Templates have not been initialized. Please call precompile method first."
            );
        } else {
            return { ...this._actionsTemplates };
        }
    }

    public get actionCreatorsTemplates(): Readonly<FeatureTemplate> {
        if (!this._actionCreatorsTemplates) {
            throw new Error(
                "Templates have not been initialized. Please call precompile method first."
            );
        } else {
            return { ...this._actionCreatorsTemplates };
        }
    }

    public get reducerTemplates(): Readonly<FeatureTemplate> {
        if (!this._reducerTemplates) {
            throw new Error(
                "Templates have not been initialized. Please call precompile method first."
            );
        } else {
            return { ...this._reducerTemplates };
        }
    }

    public get reducerActionsTemplates(): Readonly<FeatureTemplate> {
        if (!this._reducerActionsTemplates) {
            throw new Error(
                "Templates have not been initialized. Please call precompile method first."
            );
        } else {
            return { ...this._reducerActionsTemplates };
        }
    }

    async initialize(): Promise<void> {
        this._contextTemplates = await this.readContextTemplates();
        this._rootTemplates = await this.readRootTemplates();
        this._reducerTemplates = await this.readFolderTemplates("reducer");
        this._reducerActionsTemplates = await this.readFolderTemplates(
            "reducerActions"
        );
        this._actionsTemplates = await this.readFolderTemplates("actions");
        this._actionCreatorsTemplates = await this.readFolderTemplates(
            "actionCreators"
        );
    }
    async readContextTemplates(): Promise<ContextTemplates> {
        return {
            boilerplate: await readTemplate(
                path.join(
                    __dirname,
                    "templates",
                    "context",
                    "ContextBoilerplate.handlebars"
                )
            ),
            context: await readTemplate(
                path.join(
                    __dirname,
                    "templates",
                    "context",
                    "ReducerContextProvider.handlebars"
                )
            ),
            contextHooks: await readTemplate(
                path.join(
                    __dirname,
                    "templates",
                    "context",
                    "useReducerContextHooks.handlebars"
                )
            ),
            contextChangedHooks: await readTemplate(
                path.join(
                    __dirname,
                    "templates",
                    "context",
                    "useStateChangedEffectHooks.handlebars"
                )
            ),
        };
    }
    async readRootTemplates(): Promise<RootTemplates> {
        return {
            index: await readTemplate(
                path.join(__dirname, "templates", "index.handlebars")
            ),
            indexMain: await readTemplate(
                path.join(__dirname, "templates", "mainIndex.handlebars")
            ),
            defaultState: await readTemplate(
                path.join(__dirname, "templates", "defaultState.handlebars")
            ),
        };
    }

    async readFolderTemplates(featureName: string): Promise<FeatureTemplate> {
        const templates: FeatureTemplate = {
            base: await readTemplate(
                path.join(
                    __dirname,
                    "templates",
                    featureName,
                    "base.template.handlebars"
                )
            ),
            extended: await readTemplate(
                path.join(
                    __dirname,
                    "templates",
                    featureName,
                    "extended.template.handlebars"
                )
            ),
            main: await readTemplate(
                path.join(
                    __dirname,
                    "templates",
                    featureName,
                    "main.template.handlebars"
                )
            ),
        };
        return templates;
    }

    compile(template: TemplateSpecification, model: TemplateHandlebarModel): string {
        // const compiled = handlebars.precompile(template); //, { noEscape: true })(model);
        // console.log(compiled);
        // const t = handlebars.template(compiled);
        return handlebars.compile(template, { noEscape: true })(model);
    }
}
