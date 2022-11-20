// TODO unify .d.ts, .ts!

import { extensionName, getExtensionService, getExtensionLife, state, api, contributeName, getContribute, getContributeFuncResult, startConfigData } from "meta3d-type"
import { supportedEventName, actionName, skinProtocolData, } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { actions } from "meta3d-type/src/contribute/ActionProtocolConfigType"
import { needConfigData } from "meta3d-type/src/extension/StartExtensionProtocolConfigType"
import { extensionFileData, contributeFileData, extensionPackageData, contributePackageData, extensionFuncData, contributeFuncData } from "./file/ExtensionFileType"
import { extensionPackageData as extensionPackageDataApp, contributePackageData as contributePackageDataApp } from "./app/AppFileType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export function prepare(): state

export function registerExtension<extensionService, dependentExtensionNameMap, dependentContributeNameMap, extensionState>(state: state, extensionName: extensionName, getExtensionService: getExtensionService<dependentExtensionNameMap, dependentContributeNameMap, extensionService>,
    getExtensionLife: getExtensionLife<extensionService>,
    [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap],
    extensionState: extensionState
): state

type extensionLifeHandlerData = any

export function initExtension(
    state: state,
    extensionName: extensionName,
    extensionLifeHandlerData: extensionLifeHandlerData
): Promise<state>

export function updateExtension(
    state: state,
    extensionName: extensionName,
    extensionLifeHandlerData: extensionLifeHandlerData
): Promise<state>

export function getExtensionService<extensionService>(
    state: state,
    extensionName: extensionName
): extensionService

export function setExtensionState<extensionState>(
    state: state,
    extensionName: extensionName,
    extensionState: extensionState
): state

export function getExtensionState<extensionState>(
    state: state,
    extensionName: extensionName,
): extensionState

export function registerContribute<contribute, dependentExtensionNameMap, dependentContributeNameMap>(state: state, contributeName: contributeName, getContributeFunc: getContribute<dependentExtensionNameMap, dependentContributeNameMap, contribute>,
    [dependentExtensionNameMap, dependentContributeNameMap]: [dependentExtensionNameMap, dependentContributeNameMap],
): state

export function getContribute<contribute>(
    state: state,
    contributeName: contributeName
): contribute

export function startExtension(
    state: state,
    extensionName: extensionName
): void

export function generateExtension(
    extensionPackageData: extensionPackageData,
    extensionFileStr: string
): ArrayBuffer

export function loadExtension<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    extensionService,
    extensionState
>(
    extensionBinaryFile: ArrayBuffer
): extensionFileData

export function generateContribute(
    contributePackageData: contributePackageData,
    contributeFileStr: string
): ArrayBuffer

export function loadContribute<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    contributeService,
    >(
        contributeBinaryFile: ArrayBuffer
    ): contributeFileData<
        dependentExtensionNameMap,
        dependentContributeNameMap,
        contributeService
    >

export function convertAllFileDataForApp<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    extensionService,
    extensionState,
    contributeService,
    >(
        allExtensionFileData: Array<extensionFileData>,
        allContributeFileData: Array<contributeFileData<
            dependentExtensionNameMap,
            dependentContributeNameMap,
            contributeService
        >>,
        [
            allExtensionNewNames, isStartedExtensions, allContributeNewNames
        ]: [
                Array<extensionName>,
                Array<extensionName>,
                Array<contributeName>,
            ]
    ): [
        Array<[extensionPackageDataApp, extensionFuncData]>,
        Array<[contributePackageDataApp, contributeFuncData]>
    ]

export function generateApp(
    [
        allExtensionFileData,
        allContributeFileData
    ]: [
            Array<[extensionPackageDataApp, extensionFuncData]>,
            Array<[contributePackageDataApp, contributeFuncData]>
        ],
    configData: nullable<startConfigData>
): ArrayBuffer

export function loadApp(
    appBinaryFile: ArrayBuffer
): [state, Array<extensionFileData>]


export function startApp(
    [
        state,
        allExtensionDataArr
    ]: [state, Array<extensionFileData>]
): void

export function execGetContributeFunc(
    contributeFuncData: Uint8Array,
    dependentExtensionNameMap: Record<string, string>,
    dependentContributeNameMap: Record<string, string>
): getContributeFuncResult

type protocolConfigStr = string

type protocolConfigLib = any

type versionRange = string

export type serializeUIControlProtocolConfigLib = (protocolConfigStr: protocolConfigStr) => protocolConfigLib

export type getSkinProtocolData = (configLib: protocolConfigLib) => skinProtocolData

export type generateUIControlDataStr = (configLib: protocolConfigLib, rect: string, skin: string) => string

export type hasChildren = (configLib: protocolConfigLib) => boolean

export type getUIControlSupportedEventNames = (configLib: protocolConfigLib) => Array<supportedEventName>

export type generateHandleUIControlEventStr = (configLib: protocolConfigLib, actionNames: Array<actionName>) => string


export type serializeActionProtocolConfigLib = (protocolConfigStr: protocolConfigStr) => protocolConfigLib

export type getActions = (configLib: protocolConfigLib) => actions




export type serializeStartExtensionProtocolConfigLib = (protocolConfigStr: protocolConfigStr) => protocolConfigLib

export type getNeedConfigData = (configLib: protocolConfigLib) => needConfigData



export function buildAPI(): api