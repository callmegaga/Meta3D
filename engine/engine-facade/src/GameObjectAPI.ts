import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { gameObject } from "meta3d-gameobject-protocol"
import { geometry, componentName as geometryComponentName } from "meta3d-component-geometry-protocol"
import { transform, componentName as transformComponentName } from "meta3d-component-transform-protocol"
import { pbrMaterial, componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol"
import { arcballCameraController, componentName as arcballCameraControllerComponentName } from "meta3d-component-arcballcameracontroller-protocol"
import { basicCameraView, componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { perspectiveCameraProjection, componentName as perspectiveCameraProjectionComponentName } from "meta3d-component-perspectivecameraprojection-protocol"

export function createGameObject(engineCoreState: engineCoreState, { createGameObject }: engineCoreService): [engineCoreState, gameObject] {
    let contribute = createGameObject<gameObject>(engineCoreState)
    engineCoreState = contribute[0]
    let gameObject = contribute[1]

    return [
        engineCoreState,
        gameObject
    ]
}

export function getAllGameObjects(engineCoreState: engineCoreState, { getAllGameObjects }: engineCoreService): Array<gameObject> {
    return getAllGameObjects(engineCoreState)
}

export function getTransform(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)

    return getComponent(contribute, gameObject)
}

export function addTransform(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, transform: transform) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, transform), transformComponentName)
}

export function hasTransform(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, transformComponentName)

    return hasComponent(contribute, gameObject)
}

export function getGeometry(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

    return getComponent(contribute, gameObject)
}

export function addGeometry(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, geometry: geometry) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, geometry), geometryComponentName)
}

export function hasGeometry(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

    return hasComponent(contribute, gameObject)
}

export function getPBRMaterial(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)

    return getComponent(contribute, gameObject)
}

export function addPBRMaterial(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, pbrMaterial: pbrMaterial) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, pbrMaterial), pbrMaterialComponentName)
}

export function hasPBRMaterial(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)

    return hasComponent(contribute, gameObject)
}

export function getBasicCameraView(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

    return getComponent(contribute, gameObject)
}

export function addBasicCameraView(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, basicCameraView: basicCameraView) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, basicCameraView), basicCameraViewComponentName)
}

export function hasBasicCameraView(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

    return hasComponent(contribute, gameObject)
}

export function getPerspectiveCameraProjection(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)

    return getComponent(contribute, gameObject)
}

export function addPerspectiveCameraProjection(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, perspectiveCameraProjection: perspectiveCameraProjection) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, perspectiveCameraProjection), perspectiveCameraProjectionComponentName)
}

export function hasPerspectiveCameraProjection(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName)

    return hasComponent(contribute, gameObject)
}

export function getArcballCameraController(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, getComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

    return getComponent(contribute, gameObject)
}

export function addArcballCameraController(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, setUsedComponentContribute, addComponent }: engineCoreService, gameObject: gameObject, arcballCameraController: arcballCameraController) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

    return setUsedComponentContribute(engineCoreState, addComponent(contribute, gameObject, arcballCameraController), arcballCameraControllerComponentName)
}

export function hasArcballCameraController(engineCoreState: engineCoreState, { unsafeGetUsedComponentContribute, hasComponent }: engineCoreService, gameObject: gameObject) {
    let contribute = unsafeGetUsedComponentContribute(engineCoreState, arcballCameraControllerComponentName)

    return hasComponent(contribute, gameObject)
}