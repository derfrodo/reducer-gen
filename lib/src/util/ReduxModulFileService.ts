import {
    doBindPrototype,
    StringHelper,
} from "@derfrodo/frodo-s-little-helpers";
import type { ReduxModulFileServiceOptions } from "../interfaces/ReduxModulFileServiceOptions";

export interface ReduxFileNames {
    actions: string;
    actionCreators: string;
    reducer: string;
    reducerActions: string;
}
export type FullReduxFileNames = ReduxFileNames & {
    defaultState: string;
    stateProperties: string;
    index: string;
    reducerContext: string;
};

export const REDUX_FILE_NAME: Readonly<FullReduxFileNames> = Object.freeze({
    actions: "actions",
    actionCreators: "actionCreators",
    reducer: "reducer",
    reducerActions: "reducerActions",
    defaultState: "defaultState",
    stateProperties: "stateProperties",
    index: "index",
    reducerContext: "ReducerContext",
});

export class ReduxModulFileService {
    constructor(
        private options: ReduxModulFileServiceOptions,
        private stringHelper: StringHelper = new StringHelper()
    ) {
        doBindPrototype(this, ReduxModulFileService.prototype);
    }
    getGeneratedFilesPrefix(): string {
        const { filesPrefix: prefix } = this.options;
        return prefix === undefined ? "" : prefix;
    }
    getGeneratedFilesSuffix(): string {
        const { filesSuffix: suffix } = this.options;
        return suffix === undefined ? ".base.generated" : suffix;
    }
    getExtFilesPrefix(): string {
        const { extendedFilesPrefix: prefix } = this.options;
        return prefix === undefined ? "" : prefix;
    }
    getExtFilesSuffix(): string {
        const { extendedFilesSuffix: suffix } = this.options;
        return suffix === undefined ? ".extended" : suffix;
    }
    getMainFilesPrefix(): string {
        const { mainFilesPrefix: prefix } = this.options;
        return prefix === undefined ? "" : prefix;
    }
    getMainFilesSuffix(): string {
        const { mainFilesSuffix: suffix } = this.options;
        return suffix === undefined ? ".main.generated" : suffix;
    }
    getGeneratedModulNames(): ReduxFileNames & { defaultState: string; stateProperties: string } {
        return this.getCombinedReduxNames<
            ReduxFileNames,
            keyof ReduxFileNames & "defaultState" & "stateProperties",
            ReduxFileNames & { defaultState: string; stateProperties: string }
        >(this.getGeneratedFilesPrefix(), this.getGeneratedFilesSuffix(), {
            defaultState: REDUX_FILE_NAME.defaultState,
            stateProperties: REDUX_FILE_NAME.stateProperties,
        });
    }
    getGeneratedFileNames(): ReduxFileNames & { defaultState: string; stateProperties: string } {
        return this.getFilenamesWithExtension(
            this.getGeneratedModulNames(),
            ".ts"
        );
    }
    getExtensionModulNames(): ReduxFileNames {
        return this.getCombinedReduxNames(
            this.getExtFilesPrefix(),
            this.getExtFilesSuffix(),
            {}
        );
    }
    getExtensionFileNames(): ReduxFileNames {
        return this.getFilenamesWithExtension<ReduxFileNames>(
            this.getExtensionModulNames(),
            ".ts"
        );
    }
    getMainModulNames(): ReduxFileNames & {
        index: string;
        reducerContext: string;
    } {
        return this.getCombinedReduxNames<
            ReduxFileNames,
            keyof ReduxFileNames & "index" & "reducerContext",
            ReduxFileNames & { index: string; reducerContext: string }
        >(this.getMainFilesPrefix(), this.getMainFilesSuffix(), {
            index: REDUX_FILE_NAME.index,
            reducerContext: REDUX_FILE_NAME.reducerContext,
        });
    }
    getMainFileNames(): ReduxFileNames & {
        index: string;
        reducerContext: string;
    } {
        return {
            ...this.getFilenamesWithExtension(this.getMainModulNames(), ".ts"),
            reducerContext: this.getFilenameWithExtension(
                this.getMainModulNames().reducerContext,
                ".tsx"
            ),
        };
    }
    getFilenamesWithExtension<T extends {}>(
        filenamesObject: T,
        extension = ".ts"
    ): T {
        const result: T = { ...filenamesObject };
        for (const index in result) {
            if (result.hasOwnProperty(index)) {
                const value = result[index];
                if (typeof value === "string") {
                    result[index] = (this.getFilenameWithExtension(
                        value,
                        extension
                    ) as unknown) as typeof result[typeof index];
                }
            }
        }
        return result;
    }
    getFilenameWithExtension(filename: string, extension = ".ts"): string {
        const { combine } = this.stringHelper;
        return combine(filename, extension);
    }
    addLevelToImportClause(clause: string): string {
        return clause.replace(/(?<=(from\s*['"]{1}))(\.)/, (m) => `../${m}`);
    }
    addCommentToImportClause(clause: string): string {
        return `// ${clause}`;
    }
    getCombinedReduxNames<
        T,
        TKey extends keyof T & keyof ReduxFileNames,
        TAdd = { [key in TKey]: string }
    >(
        prefix: string,
        suffix: string,
        keydefinitions: {
            [key in TKey]: key extends ReduxFileNames ? never : string;
        }
    ): TAdd {
        const { combine } = this.stringHelper;

        const convertedKeys = { ...keydefinitions };
        for (const index in convertedKeys) {
            if (
                convertedKeys.hasOwnProperty(index) &&
                typeof convertedKeys[index] === "string"
            ) {
                convertedKeys[index] = combine(
                    prefix,
                    keydefinitions[index],
                    suffix
                ) as typeof convertedKeys[typeof index];
            }
        }

        return ({
            actions: combine(prefix, REDUX_FILE_NAME.actions, suffix),
            actionCreators: combine(
                prefix,
                REDUX_FILE_NAME.actionCreators,
                suffix
            ),
            reducer: combine(prefix, REDUX_FILE_NAME.reducer, suffix),
            reducerActions: combine(
                prefix,
                REDUX_FILE_NAME.reducerActions,
                suffix
            ),
            ...convertedKeys,
        } as unknown) as TAdd;
    }
}
