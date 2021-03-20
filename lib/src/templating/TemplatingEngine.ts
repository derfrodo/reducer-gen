// Todo: Add some precompiling here
import handlebars from "handlebars";
import { readFile } from "fs";
import path from "path";
import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers/dist";
import { HandlebarModel } from "../util/models/HandlebarModel";

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

export class TemplatingEngine {
    private _actionsTemplates: FeatureTemplate | undefined;
    private _actionCreatorsTemplates: FeatureTemplate | undefined;
    constructor() {
        doBindPrototype(this, TemplatingEngine.prototype);
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

    async initialize(): Promise<void> {
        this._actionsTemplates = await this.readFolderTemplates("actions");
        this._actionCreatorsTemplates = await this.readFolderTemplates(
            "actionCreators"
        );
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

    compile(template: TemplateSpecification, model: HandlebarModel): string {
        // const compiled = handlebars.precompile(template); //, { noEscape: true })(model);
        // console.log(compiled);
        // const t = handlebars.template(compiled);
        return handlebars.compile(template, { noEscape: true })(model);
    }
}
