import { ReduxFileNames } from "../ReduxModulFileService";

export type ModuleNamesHandlebarModel = {
    extended: ReduxFileNames;
    base: ReduxFileNames & {
        defaultState: string;
    };
    main: ReduxFileNames & {
        index: string;
        reducerContext: string;
    };
};
