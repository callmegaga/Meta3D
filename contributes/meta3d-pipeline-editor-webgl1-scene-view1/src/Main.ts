import { pipelineContribute } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType";
import { execFunc as execCreateDefaultSceneJob } from "./jobs/init/CreateDefaultSceneJob";
import { execFunc as execPrepareFBO } from "./jobs/update/PrepareFBOJob";
import { execFunc as execUpdateArcballCameraControllerJob } from "./jobs/update/UpdateArcballCameraControllerJob";
import { execFunc as execPrepareStatus } from "./jobs/render/PrepareStatusJob";
import { execFunc as execUseFBO } from "./jobs/render/UseFBOJob";
import { config } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/ConfigType";
import { state, states, pipelineName } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { getContribute as getContributeMeta3D } from "meta3d-type"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "scene_view1_gl_webgl1_create_default_scene_meta3d":
			return execCreateDefaultSceneJob;
		case "scene_view1_gl_webgl1_prepare_fbo_meta3d":
			return execPrepareFBO;
		case "scene_view1_gl_webgl1_update_arcballcameracontroller_meta3d":
			return execUpdateArcballCameraControllerJob;
		case "scene_view1_gl_webgl1_prepare_status_meta3d":
			return execPrepareStatus;
		case "scene_view1_gl_webgl1_use_fbo_meta3d":
			return execUseFBO;
		default:
			return null
	}
}

let _init = (_state: state) => {
}

export let getContribute: getContributeMeta3D< pipelineContribute<config, state>> = (api) => {
	return {
		pipelineName: pipelineName,
		createStateFunc: (meta3dState, _) => {
			return {
				mostService: api.getExtensionService<mostService>(meta3dState, "meta3d-bs-most-protocol"),
				webgl1Service: api.getExtensionService<webgl1Service>(meta3dState, "meta3d-webgl1-protocol"),
				uiService: api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol"),
				eventService: api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol"),
				engineWholeService: api.getExtensionService<engineWholeService>(meta3dState, "meta3d-editor-engine-whole-protocol"),
				arcballCameraController: null,
				lastYaw: null,
				lastPitch: null,
				fbo: null
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [
			{
				name: "init",
				groups: [
					{
						name: "first_webgl1_scene_view1_meta3d",
						link: "concat",
						elements: [
							{
								"name": "scene_view1_gl_webgl1_create_default_scene_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_scene_view1_meta3d"
			},
			{
				name: "update",
				groups: [
					{
						name: "first_webgl1_scene_view1_meta3d",
						link: "concat",
						elements: [
							{
								"name": "scene_view1_gl_webgl1_prepare_fbo_meta3d",
								"type_": "job"
							},
							{
								"name": "scene_view1_gl_webgl1_update_arcballcameracontroller_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_scene_view1_meta3d"
			},
			{
				name: "render",
				groups: [
					{
						name: "first_webgl1_scene_view1_meta3d",
						link: "concat",
						elements: [
							{
								"name": "scene_view1_gl_webgl1_use_fbo_meta3d",
								"type_": "job"
							},
							{
								"name": "scene_view1_gl_webgl1_prepare_status_meta3d",
								"type_": "job"
							},
						]
					}
				],
				first_group: "first_webgl1_scene_view1_meta3d"
			}
		],
	}
}
