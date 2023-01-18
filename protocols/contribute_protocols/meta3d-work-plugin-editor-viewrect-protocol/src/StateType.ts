import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { workPluginName as dataWorkPluginName, state as dataState } from "meta3d-work-plugin-webgl1-data-protocol/src/StateType"
import { extensionProtocolName } from "meta3d-type/src/Index"

export const workPluginName = "Editor_ViewRect"

export type state = {
    mostService: mostService,
    uiService: uiService,
    meta3dUIExtensionProtocolName: extensionProtocolName
}

export type states = {
    [dataWorkPluginName]: dataState,
    [workPluginName]: state,
}