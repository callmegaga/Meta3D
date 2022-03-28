import { execFunc as execFuncType } from "../../Type"
import { getGL, getState } from "../../Utils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { initMaterialUtils } from "engine-work-plugin-webgl1-utils/src/utils/InitMaterialJobUtils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"
// import { componentName, pbrMaterial } from "meta3d-component-pbrmaterial-worker-protocol"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, immutableService,  material, allMaterialIndices } = getState(states)

	return mostService.callFunc(() => {
		console.log("init material job webgl worker exec on worker thread")

		let programMap = getExn(material.programMap)

		// let usedPBRMaterialContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)
		// let allMaterialIndices = engineCoreService.getAllComponents<pbrMaterial>(usedPBRMaterialContribute)

		let newProgramMap = initMaterialUtils([webgl1Service, immutableService], getGL(states), programMap, allMaterialIndices)

		return setStatesFunc(engineCoreState, {
			...states,
			"engine-work-plugin-webgl1-worker-render": {
				...getState(states),
				material: {
					programMap: newProgramMap
				}
			}
		})
	})
}