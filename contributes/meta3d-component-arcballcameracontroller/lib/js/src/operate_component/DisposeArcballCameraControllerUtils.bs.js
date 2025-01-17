'use strict';

var Js_array = require("rescript/lib/js/js_array.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var DisposeComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeComponentUtils.bs.js");
var ConfigUtils$Meta3dComponentArcballcameracontroller = require("../config/ConfigUtils.bs.js");
var GetNeedDisposedArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller = require("../gameobject/GetNeedDisposedArcballCameraControllersUtils.bs.js");

function deferDisposeComponent(state, param) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: state.dirtyMap,
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: MutableSparseMap$Meta3dCommonlib.remove(state.gameObjectArcballCameraControllerMap, param[1]),
          needDisposedArcballCameraControllers: ArraySt$Meta3dCommonlib.push(state.needDisposedArcballCameraControllers, param[0]),
          disposedArcballCameraControllers: state.disposedArcballCameraControllers
        };
}

var _disposeSparseMapData = MutableSparseMap$Meta3dCommonlib.remove;

function _disposeData(state, cameraController) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: MutableSparseMap$Meta3dCommonlib.remove(state.gameObjectMap, cameraController),
          dirtyMap: MutableSparseMap$Meta3dCommonlib.remove(state.dirtyMap, cameraController),
          distanceMap: MutableSparseMap$Meta3dCommonlib.remove(state.distanceMap, cameraController),
          minDistanceMap: MutableSparseMap$Meta3dCommonlib.remove(state.minDistanceMap, cameraController),
          phiMap: MutableSparseMap$Meta3dCommonlib.remove(state.phiMap, cameraController),
          thetaMap: MutableSparseMap$Meta3dCommonlib.remove(state.thetaMap, cameraController),
          thetaMarginMap: MutableSparseMap$Meta3dCommonlib.remove(state.thetaMarginMap, cameraController),
          targetMap: MutableSparseMap$Meta3dCommonlib.remove(state.targetMap, cameraController),
          moveSpeedXMap: MutableSparseMap$Meta3dCommonlib.remove(state.moveSpeedXMap, cameraController),
          moveSpeedYMap: MutableSparseMap$Meta3dCommonlib.remove(state.moveSpeedYMap, cameraController),
          rotateSpeedMap: MutableSparseMap$Meta3dCommonlib.remove(state.rotateSpeedMap, cameraController),
          wheelSpeedMap: MutableSparseMap$Meta3dCommonlib.remove(state.wheelSpeedMap, cameraController),
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap,
          needDisposedArcballCameraControllers: state.needDisposedArcballCameraControllers,
          disposedArcballCameraControllers: state.disposedArcballCameraControllers
        };
}

function disposeComponents(state, cameraControllers) {
  var isDebug = ConfigUtils$Meta3dComponentArcballcameracontroller.getIsDebug(state);
  var needDisposedComponents = GetNeedDisposedArcballCameraControllersUtils$Meta3dComponentArcballcameracontroller.get(state);
  DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "arcballCameraController", cameraControllers, needDisposedComponents);
  var state_config = state.config;
  var state_maxIndex = state.maxIndex;
  var state_gameObjectMap = state.gameObjectMap;
  var state_dirtyMap = state.dirtyMap;
  var state_distanceMap = state.distanceMap;
  var state_minDistanceMap = state.minDistanceMap;
  var state_phiMap = state.phiMap;
  var state_thetaMap = state.thetaMap;
  var state_thetaMarginMap = state.thetaMarginMap;
  var state_targetMap = state.targetMap;
  var state_moveSpeedXMap = state.moveSpeedXMap;
  var state_moveSpeedYMap = state.moveSpeedYMap;
  var state_rotateSpeedMap = state.rotateSpeedMap;
  var state_wheelSpeedMap = state.wheelSpeedMap;
  var state_gameObjectArcballCameraControllerMap = state.gameObjectArcballCameraControllerMap;
  var state_needDisposedArcballCameraControllers = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedComponents, cameraControllers);
  var state_disposedArcballCameraControllers = Js_array.concat(cameraControllers, state.disposedArcballCameraControllers);
  var state$1 = {
    config: state_config,
    maxIndex: state_maxIndex,
    gameObjectMap: state_gameObjectMap,
    dirtyMap: state_dirtyMap,
    distanceMap: state_distanceMap,
    minDistanceMap: state_minDistanceMap,
    phiMap: state_phiMap,
    thetaMap: state_thetaMap,
    thetaMarginMap: state_thetaMarginMap,
    targetMap: state_targetMap,
    moveSpeedXMap: state_moveSpeedXMap,
    moveSpeedYMap: state_moveSpeedYMap,
    rotateSpeedMap: state_rotateSpeedMap,
    wheelSpeedMap: state_wheelSpeedMap,
    gameObjectArcballCameraControllerMap: state_gameObjectArcballCameraControllerMap,
    needDisposedArcballCameraControllers: state_needDisposedArcballCameraControllers,
    disposedArcballCameraControllers: state_disposedArcballCameraControllers
  };
  return ArraySt$Meta3dCommonlib.reduceOneParam(cameraControllers, _disposeData, state$1);
}

exports.deferDisposeComponent = deferDisposeComponent;
exports._disposeSparseMapData = _disposeSparseMapData;
exports._disposeData = _disposeData;
exports.disposeComponents = disposeComponents;
/* No side effect */
