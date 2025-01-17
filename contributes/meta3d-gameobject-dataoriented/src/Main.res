let getContribute: Meta3dType.Index.getContribute<
  Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<StateType.state>,
> = (api) => {
  createStateFunc: (. config) => {
    maxUID: 0,
    needDisposedGameObjectArray: [],
    config,
  },
  createGameObjectFunc: (. state) => CreateGameObjectUtils.create(state),
  getNeedDisposedGameObjectsFunc: (. state) => {
    GetNeedDisposedGameObjectsUtils.get(state)
  },
  deferDisposeGameObjectFunc: (. state, funcs, gameObject) =>
    DisposeGameObjectUtils.deferDisposeGameObject(state, funcs, gameObject),
  disposeGameObjectsFunc: (. states, funcs, gameObjects) =>
    DisposeGameObjectUtils.disposeGameObjects(states, funcs, gameObjects),
  cloneGameObjectFunc: (.
    (
      gameObjectState,
      transformState,
      pbrMaterialState,
      geometryState,
      directionLightState,
      arcballCameraControllerState,
      basicCameraViewState,
      perspectiveCameraProjectionState,
    ) as states,
    funcs,
    count,
    cloneConfig,
    sourceGameObject,
  ) => {
    CloneGameObjectUtils.clone(
      states,
      funcs,
      ConfigUtils.getIsDebug(gameObjectState),
      count,
      cloneConfig,
      sourceGameObject,
    )
  },
  getAllGameObjectsFunc: (. state) => GetAllGameObjectUtils.getAll(state),
}
