

import * as CreateState$Meta3dEngineCore from "./data/CreateState.bs.js";
import * as DirectorForJs$Meta3dEngineCore from "./manager/DirectorForJs.bs.js";

function getService(api, param) {
  return {
          prepare: DirectorForJs$Meta3dEngineCore.prepare,
          init: DirectorForJs$Meta3dEngineCore.init,
          registerWorkPlugin: DirectorForJs$Meta3dEngineCore.registerWorkPlugin,
          unregisterWorkPlugin: DirectorForJs$Meta3dEngineCore.unregisterWorkPlugin,
          runPipeline: DirectorForJs$Meta3dEngineCore.runPipeline
        };
}

function createState(param) {
  return CreateState$Meta3dEngineCore.createState(undefined);
}

var prepare = DirectorForJs$Meta3dEngineCore.prepare;

var init = DirectorForJs$Meta3dEngineCore.init;

var runPipeline = DirectorForJs$Meta3dEngineCore.runPipeline;

var registerWorkPlugin = DirectorForJs$Meta3dEngineCore.registerWorkPlugin;

var unregisterWorkPlugin = DirectorForJs$Meta3dEngineCore.unregisterWorkPlugin;

var getIsDebug = DirectorForJs$Meta3dEngineCore.getIsDebug;

var setIsDebug = DirectorForJs$Meta3dEngineCore.setIsDebug;

var registerComponent = DirectorForJs$Meta3dEngineCore.registerComponent;

var unregisterComponent = DirectorForJs$Meta3dEngineCore.unregisterComponent;

var createAndSetComponentState = DirectorForJs$Meta3dEngineCore.createAndSetComponentState;

var createComponent = DirectorForJs$Meta3dEngineCore.createComponent;

var unsafeGetRelatedComponentData = DirectorForJs$Meta3dEngineCore.unsafeGetRelatedComponentData;

var setRelatedComponentData = DirectorForJs$Meta3dEngineCore.setRelatedComponentData;

var setComponentData = DirectorForJs$Meta3dEngineCore.setComponentData;

var addComponent = DirectorForJs$Meta3dEngineCore.addComponent;

var hasComponent = DirectorForJs$Meta3dEngineCore.hasComponent;

var getComponent = DirectorForJs$Meta3dEngineCore.getComponent;

var getAllComponents = DirectorForJs$Meta3dEngineCore.getAllComponents;

var getComponentData = DirectorForJs$Meta3dEngineCore.getComponentData;

var getComponentGameObjects = DirectorForJs$Meta3dEngineCore.getComponentGameObjects;

var setGameObjectData = DirectorForJs$Meta3dEngineCore.setGameObjectData;

var createAndSetGameObjectState = DirectorForJs$Meta3dEngineCore.createAndSetGameObjectState;

var createGameObject = DirectorForJs$Meta3dEngineCore.createGameObject;

var getAllGameObjects = DirectorForJs$Meta3dEngineCore.getAllGameObjects;

var getState = DirectorForJs$Meta3dEngineCore.getState;

export {
  prepare ,
  init ,
  runPipeline ,
  registerWorkPlugin ,
  unregisterWorkPlugin ,
  getIsDebug ,
  setIsDebug ,
  registerComponent ,
  unregisterComponent ,
  createAndSetComponentState ,
  createComponent ,
  unsafeGetRelatedComponentData ,
  setRelatedComponentData ,
  setComponentData ,
  addComponent ,
  hasComponent ,
  getComponent ,
  getAllComponents ,
  getComponentData ,
  getComponentGameObjects ,
  setGameObjectData ,
  createAndSetGameObjectState ,
  createGameObject ,
  getAllGameObjects ,
  getState ,
  getService ,
  createState ,
  
}
/* No side effect */