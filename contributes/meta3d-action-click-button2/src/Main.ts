import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionData } from "meta3d-action-click-button-protocol"
// import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
// import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"

export let getContribute: getContributeMeta3D<actionContribute<actionData>> = (api) => {
    return {
        actionName: "ClickButton2",
        handler: (meta3dState, actionData) => {
            console.log("click button2")

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}
