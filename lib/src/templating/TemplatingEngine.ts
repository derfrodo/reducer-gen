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

    async initialize(): Promise<void> {
        this._actionsTemplates = await this.readFeatureTemplates("actions");
    }

    async readFeatureTemplates(featureName: string): Promise<FeatureTemplate> {
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
        return handlebars.compile(template)(model);
    }
}