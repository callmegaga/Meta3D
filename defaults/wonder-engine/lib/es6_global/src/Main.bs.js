

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Main$Meta3d from "../../../../../node_modules/meta3d/lib/es6_global/src/Main.bs.js";
import * as Main$Meta3dBsMost from "../../../../../node_modules/meta3d-bs-most/lib/es6_global/src/Main.bs.js";
import * as Main$Meta3dEngineCore from "../../../../../node_modules/meta3d-engine-core/lib/es6_global/src/Main.bs.js";
import * as Main$Meta3dWorkPluginRoot from "../../../../../node_modules/meta3d-work-plugin-root/lib/es6_global/src/Main.bs.js";
import * as Main$Meta3dGameobjectDataoriented from "../../../../../node_modules/meta3d-gameobject-dataoriented/lib/es6_global/src/Main.bs.js";

function _getMeta3DEngineCoreExtensionName(param) {
  return "meta3d-engine-core";
}

function _getMeta3DBsMostExtensionName(param) {
  return "meta3d-bs-most";
}

function _getMeta3DEngineCoreExtensionDependentExtensionNameMap(param) {
  return {
          meta3dBsMostExtensionName: "meta3d-bs-most"
        };
}

function prepare(param) {
  var state = Main$Meta3d.prepare(undefined);
  var state$1 = Main$Meta3d.registerExtension(Main$Meta3d.registerExtension(state, "meta3d-bs-most", Main$Meta3dBsMost.getService, undefined, Main$Meta3dBsMost.createState(undefined)), "meta3d-engine-core", Main$Meta3dEngineCore.getService, {
        meta3dBsMostExtensionName: "meta3d-bs-most"
      }, Main$Meta3dEngineCore.createState(undefined));
  var engineCoreState = Main$Meta3d.getExtensionStateExn(state$1, "meta3d-engine-core");
  var match = Main$Meta3d.getServiceExn(state$1, "meta3d-engine-core");
  var engineCoreState$1 = Curry._1(match.createAndSetGameObjectState, Curry._2(match.setGameObjectContribute, engineCoreState, Main$Meta3dGameobjectDataoriented.getGameObjectContribute(undefined)));
  var engineCoreState$2 = Curry._4(match.registerWorkPlugin, engineCoreState$1, Main$Meta3dWorkPluginRoot.getData(Main$Meta3d.getServiceExn(state$1, "meta3d-bs-most")), undefined, undefined);
  return Main$Meta3d.setExtensionState(state$1, "meta3d-engine-core", engineCoreState$2);
}

function init(state) {
  var match = Main$Meta3d.getServiceExn(state, "meta3d-bs-most");
  var engineCoreState = Main$Meta3d.getExtensionStateExn(state, "meta3d-engine-core");
  var match$1 = Main$Meta3d.getServiceExn(state, "meta3d-engine-core");
  var __x = Curry._3(match$1.runPipeline, Curry._1(match$1.init, engineCoreState), state, "init");
  return Curry._2(match.map, (function (engineCoreState) {
                return Main$Meta3d.setExtensionState(state, "meta3d-engine-core", engineCoreState);
              }), __x);
}

function createGameObject(state) {
  var engineCoreState = Main$Meta3d.getExtensionStateExn(state, "meta3d-engine-core");
  var match = Main$Meta3d.getServiceExn(state, "meta3d-engine-core");
  var match$1 = Curry._1(match.createGameObject, engineCoreState);
  return [
          Main$Meta3d.setExtensionState(state, "meta3d-engine-core", match$1[0]),
          match$1[1]
        ];
}

function getAllGameObjects(state) {
  var engineCoreState = Main$Meta3d.getExtensionStateExn(state, "meta3d-engine-core");
  var match = Main$Meta3d.getServiceExn(state, "meta3d-engine-core");
  return Curry._1(match.getAllGameObjects, engineCoreState);
}

export {
  _getMeta3DEngineCoreExtensionName ,
  _getMeta3DBsMostExtensionName ,
  _getMeta3DEngineCoreExtensionDependentExtensionNameMap ,
  prepare ,
  init ,
  createGameObject ,
  getAllGameObjects ,
  
}
/* Main-Meta3dBsMost Not a pure module */
