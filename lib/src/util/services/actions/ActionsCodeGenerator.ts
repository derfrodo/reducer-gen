import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers";
import { ActionsHandlebarModel } from "../../models/ActionsHandlebarModel";

export class ActionsCodeGenerator {
    constructor() {
        doBindPrototype(this, ActionsCodeGenerator.prototype);
    }

    generateBaseActionContent(model: ActionsHandlebarModel): string {
        // const template = readFileSync(baseTemplatePath);
        return "FALSE";
        //         handlebars.compile(readFileSync("./../"));

        //         return `export enum ${actionsEnumName} {
        // ${this.reduxModuleNamingHelper
        //     .getActionStrings(stateInfo)
        //     .map(
        //         (a) => `    ${a} = "${a}",
        // `
        //     )
        //     .join("")}}

        // export default ${actionsEnumName};
        // `;
    }

    //     generateExtActionContent(stateInfo: StateInterfaceInfo): string {
    //         const actionsEnumName = this.reduxModuleNamingHelper.getActionEnumName(
    //             stateInfo,
    //             "ext"
    //         );

    //         return `export enum ${actionsEnumName} {
    // // e.g. SET_IS_LOGGED_IN_EXT = "SET_IS_LOGGED_IN_EXT",

    // }

    // export default ${actionsEnumName}`;
    //     }

    //     generateMainActionContent(stateInfo: StateInterfaceInfo): string {
    //         const actionsEnumNameBase = this.reduxModuleNamingHelper.getActionEnumName(
    //             stateInfo,
    //             "base"
    //         );
    //         const actionsEnumNameExt = this.reduxModuleNamingHelper.getActionEnumName(
    //             stateInfo,
    //             "ext"
    //         );
    //         const actionsEnumName = this.reduxModuleNamingHelper.getActionEnumName(
    //             stateInfo,
    //             "main"
    //         );

    //         return `import ${actionsEnumNameBase} from "./${
    //             this.fileService.getGeneratedModulNames().action
    //         }";
    // import ${actionsEnumNameExt} from "./${
    //             this.fileService.getExtensionModulNames().action
    //         }";

    // export const ${actionsEnumName} = { ...${actionsEnumNameBase}, ...${actionsEnumNameExt} };

    // export default ${actionsEnumName}`;
    //     }
}
