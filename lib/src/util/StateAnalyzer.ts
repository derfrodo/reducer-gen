import { FileSystemHelper } from "@derfrodo/frodo-s-little-helpers/dist/node";
import { FeatureStateDataObject } from "../interfaces/FeatureStateDataObject";

import * as ts from "typescript";
import StateInterfaceInfo, {
    StatePropertyInfo,
    STATE_PROPERT_TYPES,
} from "../interfaces/StateInterfaceInfo";
import { StringHelper } from "@derfrodo/frodo-s-little-helpers";
import log from "loglevel";
import StateAnalyzerOptions from "../interfaces/StateAnalyzerOptions";
import FeatureModuleFileInfo from "../interfaces/FeatureModuleFileInfo";

type UnionTypeTypes = {
    types: STATE_PROPERT_TYPES[];
    nullable?: boolean;
    undefineable?: boolean;
};

export class StateAnalyzer {
    private options: StateAnalyzerOptions;
    private fsHelper: FileSystemHelper;
    private strHelper: StringHelper;

    constructor(
        options: StateAnalyzerOptions,
        fsHelper: FileSystemHelper = new FileSystemHelper(),
        strHelper: StringHelper = new StringHelper()
    ) {
        this.options = options;
        this.fsHelper = fsHelper;
        this.strHelper = strHelper;
        this.createFeatureStateDataObjects = this.createFeatureStateDataObjects.bind(
            this
        );
        this.analyseStateFiles = this.analyseStateFiles.bind(this);
        this.visitStateFile = this.visitStateFile.bind(this);
        this.printNode = this.printNode.bind(this);
        this.getWithAnalyseStateInterface = this.getWithAnalyseStateInterface.bind(
            this
        );
        this.createMemberInfo = this.createMemberInfo.bind(this);
        this.resolveTypesOfUnionTypes = this.resolveTypesOfUnionTypes.bind(
            this
        );
        this.getFeatureModuleFileInfoForFile = this.getFeatureModuleFileInfoForFile.bind(
            this
        );
    }
    async createFeatureStateDataObjects(
        pathsToStateFiles: string[]
    ): Promise<FeatureStateDataObject[]> {
        const {
            getParentFolderFromFSObjectsPath,
            getObjectNameFromFSObjectsPath,
            combinePath,
        } = this.fsHelper;

        const result: FeatureStateDataObject[] = [];
        for await (const path of pathsToStateFiles) {
            const reduxPath = await getParentFolderFromFSObjectsPath(path);
            const featurePath = await getParentFolderFromFSObjectsPath(
                reduxPath
            );
            const featureName = await getObjectNameFromFSObjectsPath(
                featurePath
            );

            result.push({
                featureName,
                folderToFeatureReducer: reduxPath,
                pathToStateFile: path,
                indexFile: await this.getFeatureModuleFileInfoForFile(
                    combinePath(reduxPath, "index.ts")
                ),

                // extensionFiles: {},
                // mainFiles: {},
            });
        }
        return result;
    }

    async getFeatureModuleFileInfoForFile(
        filePath: string
    ): Promise<FeatureModuleFileInfo> {
        const { pathExists, isFile } = this.fsHelper;
        const exists = await pathExists(filePath);

        if (exists && !isFile(filePath)) {
            throw new Error(`Expected file at "${filePath}".`);
        }

        const result: FeatureModuleFileInfo = {
            fileExists: exists,
            filePath: filePath,
        };
        return result;
    }

    async analyseStateFiles(
        data: FeatureStateDataObject[]
    ): Promise<StateInterfaceInfo[]> {
        const result = [];
        for await (const entry of data) {
            const stateInfo = await this.visitStateFile(entry);
            result.push(stateInfo);
        }
        return result;
    }

    async visitStateFile(
        data: FeatureStateDataObject
    ): Promise<StateInterfaceInfo> {
        const { pathToStateFile: path } = data;
        const fsHelper = this.fsHelper;
        const stringHelper = this.strHelper;
        const doc = ts.createSourceFile(
            await fsHelper.getObjectNameFromFSObjectsPath(path),
            await fsHelper.readFile(path),
            ts.ScriptTarget.ES2015
        );
        let result: StateInterfaceInfo = {
            featureData: data,
            stateInterfaceName: undefined,
            stateProperties: [],
            importClauses: [],
        };

        for await (const node of doc.statements) {
            switch (node.kind) {
                case ts.SyntaxKind.InterfaceDeclaration:
                    if (this.isStateInterface(node)) {
                        result.stateInterfaceName = node.name.text;
                        result = await this.getWithAnalyseStateInterface(
                            node,
                            doc,
                            result
                        );
                    } else {
                        this.printNode(
                            node,
                            "ADDITIONAL INTERFACE => WILL BE IGNORED"
                        );
                    }
                    break;
                case ts.SyntaxKind.ImportDeclaration:
                    if (ts.isImportDeclaration(node)) {
                        result.importClauses.push(
                            stringHelper.trim(node.getFullText(doc))
                        );
                    }
                    break;
                case ts.SyntaxKind.ExportAssignment:
                    if (ts.isExportAssignment(node)) {
                        const text = node.expression.getText(doc);
                        result.hasStateAsDefaultExport =
                            typeof text === "string" &&
                            result.stateInterfaceName === text;
                    }
                    log.debug("Found export in state file");
                    // TODO: Check if exported item used in state (may also be state itself :) )
                    break;
                default:
                    this.printNode(node);
                    break;
            }
        }

        if (result.stateProperties.length === 0) {
            console.warn(
                `state interface not found or no properties inside state ${path}. Please do not place files named state.ts in folders named redux without an interface "IState" or "State.`
            );
        }
        return result;
        // throw new Error(`No state interface has been found in file ${path}. Please do not place files named state.ts in folders named redux without an interface "IState" or "State".`)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    printNode(node: ts.Node, prefix?: string, ...params: any[]): void {
        if (prefix) {
            log.debug(prefix, ts.SyntaxKind[node.kind], node, ...params);
        } else {
            log.debug(ts.SyntaxKind[node.kind], node, ...params);
        }
    }

    isStateInterface(node: ts.Node): node is ts.InterfaceDeclaration {
        return (
            ts.isInterfaceDeclaration(node) &&
            (node.name.text === "IState" || node.name.text === "State")
        );
    }

    async getWithAnalyseStateInterface(
        interfaceNode: ts.InterfaceDeclaration,
        srcFile: ts.SourceFile,
        info: StateInterfaceInfo
    ): Promise<StateInterfaceInfo> {
        const interfaceInfo: StateInterfaceInfo = { ...info };

        if (
            (interfaceNode.modifiers || []).filter(
                (mod) => mod.kind === ts.SyntaxKind.ExportKeyword
            ).length === 0
        ) {
            throw new Error("No export modifier at state interface.");
        }

        for (const member of interfaceNode.members) {
            if (ts.isPropertySignature(member)) {
                interfaceInfo.stateProperties.push(
                    this.createMemberInfo(member, srcFile)
                );
            } else {
                this.printNode(member);
            }
        }

        return interfaceInfo;
    }

    createMemberInfo(
        node: ts.PropertySignature,
        srcFile?: ts.SourceFile
    ): StatePropertyInfo {
        const { name, type } = node;
        const sh = this.strHelper;

        const result: StatePropertyInfo = {
            name: "",
            types: [],
            typesText: sh.trim(type?.getFullText(srcFile) || ""),
            nullable: false,
            undefineable: false,
        };
        if (ts.isIdentifier(name)) {
            result.name = name.text;
        }
        switch (type?.kind) {
            case ts.SyntaxKind.BooleanKeyword:
                result.types.push(STATE_PROPERT_TYPES.BOOLEAN);
                break;
            case ts.SyntaxKind.NumberKeyword:
                result.types.push(STATE_PROPERT_TYPES.NUMBER);
                break;
            case ts.SyntaxKind.StringKeyword:
                result.types.push(STATE_PROPERT_TYPES.STRING);
                break;
            case ts.SyntaxKind.UndefinedKeyword:
                result.undefineable = true;
                break;
            case ts.SyntaxKind.NullKeyword:
                result.nullable = true;
                break;
            case ts.SyntaxKind.ArrayType:
                if (result.arrayElementType === undefined) {
                    const elementType = (type as ts.ArrayTypeNode).elementType;
                    result.arrayElementType = sh.trim(
                        elementType.getFullText(srcFile) ?? "object"
                    );
                }
                result.types.push(STATE_PROPERT_TYPES.ARRAY);
                break;
            case ts.SyntaxKind.TypeReference:
                result.types.push(STATE_PROPERT_TYPES.OBJECT);
                break;
            case ts.SyntaxKind.UnionType:
                if (type && ts.isUnionTypeNode(type)) {
                    const unionTypeTypes = this.resolveTypesOfUnionTypes(type);
                    result.types.push(...unionTypeTypes.types);

                    if (
                        unionTypeTypes.types.length === 1 &&
                        unionTypeTypes.types[0] === STATE_PROPERT_TYPES.ARRAY
                    ) {
                        const arrayTypes = type.types.filter(
                            (t) => t.kind === ts.SyntaxKind.ArrayType
                        );
                        if (arrayTypes.length === 1) {
                            const elementType = (arrayTypes[0] as ts.ArrayTypeNode)
                                .elementType;
                            result.arrayElementType = sh.trim(
                                elementType.getFullText(srcFile) ?? "object"
                            );
                        }
                    }

                    result.nullable =
                        unionTypeTypes.nullable || result.nullable;
                    result.undefineable =
                        unionTypeTypes.undefineable || result.undefineable;
                }
                break;
            default:
                if (type) {
                    this.printNode(type);
                }
                throw new Error(
                    `Type for property "${result.name}" can not be resolved: ${
                        type && type.kind ? ts.SyntaxKind[type.kind] : type
                    }`
                );
            case undefined:
                throw new Error(
                    `No type has been found for property "${result.name}".`
                );
                break;
        }
        return result;
    }

    resolveTypesOfUnionTypes(unionTypeNode: ts.UnionTypeNode): UnionTypeTypes {
        const result: UnionTypeTypes = { types: [] };
        for (const ut of unionTypeNode.types) {
            switch (ut.kind) {
                case ts.SyntaxKind.TypeReference:
                    result.types.push(STATE_PROPERT_TYPES.OBJECT);
                    break;
                case ts.SyntaxKind.ArrayType:
                    result.types.push(STATE_PROPERT_TYPES.ARRAY);
                    break;
                case ts.SyntaxKind.BooleanKeyword:
                    result.types.push(STATE_PROPERT_TYPES.BOOLEAN);
                    break;
                case ts.SyntaxKind.NumberKeyword:
                    result.types.push(STATE_PROPERT_TYPES.NUMBER);
                    break;
                case ts.SyntaxKind.StringKeyword:
                    result.types.push(STATE_PROPERT_TYPES.STRING);
                    break;
                case ts.SyntaxKind.UndefinedKeyword:
                    result.undefineable = true;
                    break;
                case ts.SyntaxKind.NullKeyword:
                    result.nullable = true;
                    break;
                default:
                    if (ut) {
                        this.printNode(ut);
                    }
                    throw new Error(
                        `Inner type for unionType can not be resolved: ${
                            ut && ut.kind ? ts.SyntaxKind[ut.kind] : ut
                        }`
                    );
            }
        }
        return result;
    }
}
