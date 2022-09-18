open Sinon

let createState = () => {
  Main.createExtensionState()
}

let init = (
  ~sandbox,
  ~getExtensionService,
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionName="imguiRendererExtensionName",
  ~isDebug=false,
  ~meta3dState=Obj.magic(1),
  ~canvas=Obj.magic(10),
  (),
) => {
  UIManager.init(
    meta3dState,
    (
      (
        {
          registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
          getExtensionService: getExtensionService->Obj.magic,
          setExtensionState: setExtensionState->Obj.magic,
          getExtensionState: getExtensionState->Obj.magic,
          registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
          getContribute: createEmptyStubWithJsObjSandbox(sandbox),
        }: Meta3dType.Index.api
      ),
      imguiRendererExtensionName,
    ),
    isDebug,
    canvas,
  )
}

let buildIOData = (
  ~pointUp=false,
  ~pointDown=false,
  ~pointPosition=(0, 0),
  ~pointMovementDelta=(0, 0),
  (),
): Meta3dUiProtocol.StateType.ioData => {
  {
    pointUp: pointUp,
    pointDown: pointDown,
    pointPosition: pointPosition,
    pointMovementDelta: pointMovementDelta,
  }
}

let render = (
  ~sandbox,
  ~getExtensionService=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
    ImguiRendererServiceTool.buildService(~sandbox, ()),
    _,
  ),
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~uiExtensionName="uiExtensionName",
  ~imguiRendererExtensionName="imguiRendererExtensionName",
  ~meta3dState=Obj.magic(1),
  ~ioData=buildIOData(),
  (),
) => {
  UIManager.render(
    (
      {
        registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
        getExtensionService: getExtensionService->Obj.magic,
        setExtensionState: setExtensionState->Obj.magic,
        getExtensionState: getExtensionState->Obj.magic,
        registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
        getContribute: createEmptyStubWithJsObjSandbox(sandbox),
      }: Meta3dType.Index.api
    ),
    meta3dState,
    (uiExtensionName, imguiRendererExtensionName),
    ioData,
  )
}

let registerElement = (
  ~sandbox,
  ~state,
  ~elementFunc,
  ~elementName="e1",
  ~execOrder=0,
  ~elementState=Obj.magic(1),
  (),
) => {
  UIManager.registerElement(
    state,
    (
      {
        elementName: elementName,
        execOrder: execOrder,
        elementFunc: elementFunc,
        elementState: elementState,
      }: Meta3dUiProtocol.ElementContributeType.elementContribute<
        Meta3dUiProtocol.StateType.elementState,
      >
    ),
  )
}

let markStateChange = (~state, ~elementName) => {
  UIManager._markStateChange(state, elementName)
}

let isStateChange = (state: Meta3dUiProtocol.StateType.state, elementName) => {
  state.isStateChangeMap->Meta3dCommonlib.ImmutableHashMap.getExn(elementName) == true
}

let show = (~state, ~elementName) => {
  UIManager.show(state, elementName)
}

let hide = (~state, ~elementName) => {
  UIManager.hide(state, elementName)
}

let drawBox = (
  ~sandbox,
  ~rect,
  ~backgroundColor,
  ~getExtensionService,
  ~getExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensionState=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imguiRendererExtensionName="imguiRendererExtensionName",
  ~meta3dState=Obj.magic(1),
  (),
) => {
  UIManager.drawBox(
    meta3dState,
    (
      (
        {
          registerExtension: createEmptyStubWithJsObjSandbox(sandbox),
          getExtensionService: getExtensionService->Obj.magic,
          setExtensionState: setExtensionState->Obj.magic,
          getExtensionState: getExtensionState->Obj.magic,
          registerContribute: createEmptyStubWithJsObjSandbox(sandbox),
          getContribute: createEmptyStubWithJsObjSandbox(sandbox),
        }: Meta3dType.Index.api
      ),
      imguiRendererExtensionName,
    ),
    rect,
    backgroundColor,
  )
}

let registerCustomControl = (~customControlName, ~func, ~state=createState(), ()) => {
  UIManager.registerCustomControl(
    state,
    (
      {
        customControlName: customControlName,
        func: func,
      }: Meta3dUiProtocol.CustomControlContributeType.customControlContribute<
        Meta3dUiProtocol.StateType.inputData,
        Meta3dUiProtocol.StateType.outputData,
      >
    ),
  )
}

let getCustomControlExn = UIManager.getCustomControlExn

let buildSkinContribute = (skinName, skin): Meta3dUiProtocol.SkinContributeType.skinContribute<
  Meta3dUiProtocol.StateType.skin,
> => {
  {
    skinName: skinName,
    skin: skin,
  }
}

let registerSkin = (~skinName, ~skin, ~state=createState(), ()) => {
  UIManager.registerSkin(state, buildSkinContribute(skinName, skin))
}

let getSkinExn = UIManager.getSkinExn

let combineReducer = UIManager.combineReducers

let dispatch = UIManager.dispatch

let getElementState = UIManager.getElementState