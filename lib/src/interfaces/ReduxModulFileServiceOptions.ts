export interface ReduxModulFileServiceOptions {
    filesSuffix?: string;
    filesPrefix?: string;

    extendedFilesPrefix?: string;
    extendedFilesSuffix?: string;
    mainFilesPrefix?: string;
    mainFilesSuffix?: string;
}

export const getDefaultReduxModulFileServiceOptions: () => ReduxModulFileServiceOptions = () => ({
    extendedFilesPrefix: "",
    extendedFilesSuffix: ".extended",
});
