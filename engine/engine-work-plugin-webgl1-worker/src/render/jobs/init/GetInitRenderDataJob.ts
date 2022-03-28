import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"
import { createGetMainWorkerDataStream } from "meta3d-commonlib-ts/src/CreateWorkerDataStreamService"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService } = getState(states)

	let offscreenCanvas: OffscreenCanvas
	let allGeometryIndices: number[]
	let allMaterialIndices: number[]
	let transformCount: number
	let geometryCount: number
	let geometryPointCount: number
	let pbrMaterialCount: number
	let transformBuffer: SharedArrayBuffer
	let geometryBuffer: SharedArrayBuffer
	let pbrMaterialBuffer: SharedArrayBuffer

	return createGetMainWorkerDataStream(
		mostService,
		(event: MessageEvent) => {
			offscreenCanvas = event.data.canvas
			allGeometryIndices = event.data.allGeometryIndices
			allMaterialIndices = event.data.allMaterialIndices
			transformCount = event.data.transformCount
			geometryCount = event.data.geometryCount
			geometryPointCount = event.data.geometryPointCount
			pbrMaterialCount = event.data.pbrMaterialCount
			transformBuffer = event.data.transformBuffer
			geometryBuffer = event.data.geometryBuffer
			pbrMaterialBuffer = event.data.pbrMaterialBuffer
		},
		"SEND_INIT_RENDER_DATA",
		self as any as Worker
	).map(() => {
		console.log("get init render data job webgl worker exec on worker thread")

		//// TODO fix: should use newest states @yyc

		return setStatesFunc<states>(
			engineCoreState,
			{
				...states,
				"engine-work-plugin-webgl1-worker-render": {
					...getState(states),
					canvas: offscreenCanvas,
					allGeometryIndices: allGeometryIndices,
					allMaterialIndices: allMaterialIndices,
					transformCount: transformCount,
					geometryCount: geometryCount,
					geometryPointCount: geometryPointCount,
					pbrMaterialCount: pbrMaterialCount,
					transformBuffer: transformBuffer,
					geometryBuffer: geometryBuffer,
					pbrMaterialBuffer: pbrMaterialBuffer
				}
			}
		)
	})
}