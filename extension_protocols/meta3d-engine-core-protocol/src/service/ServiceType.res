type service = {
  getIsDebug: StateType.state => bool,
  setIsDebug: (StateType.state, bool) => StateType.state,
  prepare: unit => unit,
  init: StateType.state => StateType.state,
  registerWorkPlugin: (
    ~state: StateType.state,
    ~contribute: WorkManagerType.workPluginContribute,
    ~jobOrders: RegisterWorkPluginVOType.jobOrders=?,
    unit,
  ) => StateType.state,
  unregisterWorkPlugin: (StateType.state, IWorkForJs.pluginName) => StateType.state,
  registerComponent: (
    StateType.state,
    RegisterComponentType.componentContribute,
  ) => StateType.state,
  unregisterComponent: (StateType.state, IComponentForJs.componentName) => StateType.state,
  createAndSetComponentState: (
    StateType.state,
    IComponentForJs.componentName,
    RegisterComponentType.config,
  ) => StateType.state,
  unsafeGetUsedComponentContribute: (
    StateType.state,
    IComponentForJs.componentName,
  ) => RegisterComponentType.usedComponentContribute,
  setUsedComponentContribute: (
    StateType.state,
    RegisterComponentType.usedComponentContribute,
    IComponentForJs.componentName,
  ) => StateType.state,
  createComponent: RegisterComponentType.usedComponentContribute => (
    RegisterComponentType.usedComponentContribute,
    RegisterComponentType.component,
  ),
  setComponentData: (
    RegisterComponentType.usedComponentContribute,
    RegisterComponentType.component,
    RegisterComponentType.dataName,
    IComponentForJs.dataValue,
  ) => RegisterComponentType.usedComponentContribute,
  addComponent: (
    RegisterComponentType.usedComponentContribute,
    IGameObjectForJs.gameObject,
    RegisterComponentType.component,
  ) => RegisterComponentType.usedComponentContribute,
  hasComponent: (
    RegisterComponentType.usedComponentContribute,
    IGameObjectForJs.gameObject,
  ) => bool,
  getComponent: (
    RegisterComponentType.usedComponentContribute,
    IGameObjectForJs.gameObject,
  ) => Js.Nullable.t<RegisterComponentType.component>,
  getAllComponents: RegisterComponentType.usedComponentContribute => array<
    RegisterComponentType.component,
  >,
  getComponentData: (
    RegisterComponentType.usedComponentContribute,
    RegisterComponentType.component,
    RegisterComponentType.dataName,
  ) => Js.Nullable.t<IComponentForJs.dataValue>,
  getComponentGameObjects: (
    RegisterComponentType.usedComponentContribute,
    RegisterComponentType.component,
  ) => array<IGameObjectForJs.gameObject>,
  getComponentState: (
    StateType.state,
    IComponentForJs.componentName,
  ) => Js.Nullable.t<RegisterComponentType.state>,
  setGameObjectContribute: (
    StateType.state,
    GameObjectType.gameObjectContribute,
  ) => StateType.state,
  createAndSetGameObjectState: StateType.state => StateType.state,
  createGameObject: StateType.state => (StateType.state, GameObjectType.gameObject),
  getAllGameObjects: StateType.state => array<GameObjectType.gameObject>,
  runPipeline: (
    StateType.state,
    Meta3dType.Index.state,
    PipelineType.pipelineName,
  ) => // TODO change to Promist.t, hidden Stream!
  Meta3dBsMostProtocol.StreamType.stream<StateType.state>,
}