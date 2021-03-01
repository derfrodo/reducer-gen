// Todo: Add some precompiling here
import handlebars from "handlebars";
import { readFile } from "fs";
import path from "path";
import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers/dist";

type FeatureTemplate = {
    main?: TemplateSpecification;
    extended?: TemplateSpecification;
    base?: TemplateSpecification;
};

export class TemplatingEngine {
    private _actionsTemplates: FeatureTemplate = {};
    constructor() {
        doBindPrototype(this, TemplatingEngine.prototype);
    }

    public get actionsTemplates(): Readonly<FeatureTemplate> {
        return { ...this.actionsTemplates };
    }

    async precompile(): Promise<void> {
        this._actionsTemplates.base = handlebars.precompile(
            await new Promise((r, rej) =>
                readFile(
                    path.join(
                        __dirname,
                        "templates/actions/base.template.handlebars"
                    ),
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
            )
        );
    }

    compile(){
        
    }
}
