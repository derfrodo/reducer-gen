import { doBindPrototype } from "@derfrodo/frodo-s-little-helpers";
import StateInterfaceInfo from "../../interfaces/StateInterfaceInfo";
import ReduxModuleNamingHelper from "../ReduxModuleNamingHelper";
import ReduxModulFileService from "../ReduxModulFileService";

export interface SyncStateActionCodesGeneratorOptions {}

export class SyncStateActionCodesGenerator {
    constructor(
        private options: SyncStateActionCodesGeneratorOptions,
        private reduxModuleNamingHelper: ReduxModuleNamingHelper,
        private fileService: ReduxModulFileService
    ) {
        doBindPrototype(this, SyncStateActionCodesGenerator.prototype);
    }

    getImportClauses(
        stateInfo: StateInterfaceInfo,
        asNested = true,
        asComment = false
    ): string {
        const { importClauses } = stateInfo;
        return asNested
            ? `${importClauses
                  .map((clause) =>
                      asComment
                          ? this.fileService.addCommentToImportClause(clause)
                          : clause
                  )
                  .map(this.fileService.addLevelToImportClause)
                  .join("\n")}`
            : `${importClauses.join("\n")}`;
    }

    // Main Elements
    generateSyncStateActionsContent(): string {
        return `${this.reduxModuleNamingHelper.getGeneralGenertedFileInformation()}
export const SYNC_STATE_ACTION_TYPE = "SyncStateAction";
export const SYNC_STATE_ACTION_SOURCE_WEBAPP = "WebApp";
export const SYNC_STATE_ACTION_SOURCE_FRAME = "Frame";

export const SYNC_STATE_ACTION_SOURCES = {
    webApp: SYNC_STATE_ACTION_SOURCE_WEBAPP,
    frame: SYNC_STATE_ACTION_SOURCE_FRAME,
};

export type SyncActionSources = "WebApp" | "Frame";

export interface SyncStateAction<T> {
    type: "SyncStateAction";
    source: SyncActionSources;
    payload: T;
}

export const isSyncStateAction = <T>(
    obj: any,
    payloadTypeGuard: (payload: any) => payload is T
) => {
    return (
        typeof obj === "object" &&
        obj.type === SYNC_STATE_ACTION_TYPE &&
        (obj.source === SYNC_STATE_ACTION_SOURCE_WEBAPP ||
            obj.source === SYNC_STATE_ACTION_SOURCE_WEBAPP) &&
        payloadTypeGuard(obj.payload)
    );
};

export const asSyncStateAction = <T>(
    obj: any,
    payloadTypeGuard: (payload: any) => payload is T
): SyncStateAction<T> | null => {
    try {
        const fromObj = isSyncStateAction(obj, payloadTypeGuard) ? obj : null;
        try {
            if (fromObj === null && typeof obj === "string") {
                const parsed = JSON.parse(obj);
                const fromStr = isSyncStateAction(parsed, payloadTypeGuard)
                    ? parsed
                    : null;
                return fromStr;
            }
        } catch (err) {
            console.debug("Failed to parse object with JSON", { error: err });
        }
        return fromObj;
    } catch (err) {
        console.debug("Failed to parse object to SyncStateAction", {
            error: err,
        });
    }
    return null;
};

export const createSyncStateAction = <T>(
    action: T,
    source: SyncActionSources
): SyncStateAction<T> | null => {
    return {
        type: SYNC_STATE_ACTION_TYPE,
        source,
        payload: action,
    };
};
`;
    }
}
