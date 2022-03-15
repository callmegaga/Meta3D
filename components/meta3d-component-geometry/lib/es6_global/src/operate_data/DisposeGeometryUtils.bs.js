

import * as Caml_obj from "./../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as ArrayMapUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ConfigUtils$Meta3dComponentGeometry from "../config/ConfigUtils.bs.js";
import * as DisposeSharedComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeSharedComponentUtils.bs.js";
import * as BufferGeometryUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry from "../gameobject/GetNeedDisposedGeometrysUtils.bs.js";
import * as ReallocatedPointsGeometryUtils$Meta3dComponentGeometry from "./ReallocatedPointsGeometryUtils.bs.js";

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

function deferDisposeComponent(state) {
  var gameObjectGeometryMap = state.gameObjectGeometryMap;
  var needDisposedGeometrys = state.needDisposedGeometrys;
  return function (param) {
    var gameObject = param[1];
    var newrecord = Caml_obj.caml_obj_dup(state);
    newrecord.needDisposedGeometrys = ArrayMapUtils$Meta3dCommonlib.addValue(needDisposedGeometrys, param[0], gameObject);
    newrecord.gameObjectGeometryMap = MutableSparseMap$Meta3dCommonlib.remove(gameObjectGeometryMap, gameObject);
    return newrecord;
  };
}

function _disposeData(state) {
  var verticesInfos = state.verticesInfos;
  var texCoordsInfos = state.texCoordsInfos;
  var normalsInfos = state.normalsInfos;
  var indicesInfos = state.indicesInfos;
  return function (isDebug, component) {
    var infoIndex = BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(component);
    ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setInfo(verticesInfos, infoIndex, 0, 0, isDebug);
    ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setInfo(texCoordsInfos, infoIndex, 0, 0, isDebug);
    ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setInfo(normalsInfos, infoIndex, 0, 0, isDebug);
    ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setInfo(indicesInfos, infoIndex, 0, 0, isDebug);
    return state;
  };
}

function disposeComponents(state, componentDataMap) {
  var isDebug = ConfigUtils$Meta3dComponentGeometry.getIsDebug(state);
  var needDisposedComponents = GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry.get(state);
  DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "component", MutableSparseMap$Meta3dCommonlib.getKeys(componentDataMap), MutableSparseMap$Meta3dCommonlib.getKeys(needDisposedComponents));
  var match = MutableSparseMap$Meta3dCommonlib.reducei(componentDataMap, (function (param, gameObjects, component) {
          var disposedComponents = param[1];
          var state = param[0];
          state.gameObjectsMap = ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr(state.gameObjectsMap, component, gameObjects);
          if (DisposeSharedComponentUtils$Meta3dCommonlib.isComponentHasNoGameObject(state.gameObjectsMap, component, gameObjects)) {
            return [
                    state,
                    disposedComponents
                  ];
          } else {
            return [
                    _disposeData(state)(isDebug, component),
                    ArraySt$Meta3dCommonlib.push(disposedComponents, component)
                  ];
          }
        }), [
        state,
        []
      ]);
  var disposedComponents = match[1];
  var state$1 = match[0];
  state$1.disposedGeometrys = state$1.disposedGeometrys.concat(disposedComponents);
  state$1.needDisposedGeometrys = DisposeSharedComponentUtils$Meta3dCommonlib.removeDisposedComponentsFromNeedDisposedComponents(needDisposedComponents, disposedComponents);
  return state$1;
}

export {
  _removeComponent ,
  deferDisposeComponent ,
  _disposeData ,
  disposeComponents ,
  
}
/* No side effect */
