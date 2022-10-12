open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/elementVisual.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let isDebug = true

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })
  }

  test(."if not loaded, show loading", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"("not loaded and render", () => {
      ()
    })

    then("should show loading", () => {
      let useSelectorStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
        (
          isDebug,
          (CanvasControllerTool.buildCanvasData(), list{}, list{}),
          (
            list{},
            list{},
            None,
            None,
            ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers()),
          ),
        ),
        // (CanvasControllerTool.buildCanvasData(), list{}, list{}, None),

        _,
      )

      ElementVisualTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."if loaded, show the canvas", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("prepare the canvas", () => {
      ()
    })

    \"and"("set its width, height", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (
            isDebug,
            (CanvasControllerTool.buildCanvasData(~width=10, ~height=20, ()), list{}, list{}),
            (
              list{},
              list{},
              Some(Obj.magic(1)),
              None,
              ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers()),
            ),
          ),
          _,
        )
    })

    \"when"("loaded and render", () => {
      ()
    })

    then("should show the canvas", () => {
      ElementVisualTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents->Obj.magic, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."get and set newest visual extension", ({given, \"when", \"and", then}) => {
    let name = ElementVisualTool.getVisualExtensionName()
    let v1 = ref(Obj.magic(1))
    let v2 = ref(Obj.magic(1))
    let getAllPublishNewestExtensionsStub = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("generate visual extension v1 with old version", () => {
      v1 :=
        Meta3d.Main.generateExtension(
          (
            {
              name: name,
              protocol: {
                name: ElementVisualTool.getVisualExtensionProtocolName(),
                version: "0.5.0",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: Meta3d.ExtensionFileType.extensionPackageData
          ),
          "",
        )
    })

    given("generate visual extension v2 with newest version", () => {
      v2 :=
        Meta3d.Main.generateExtension(
          (
            {
              name: name,
              protocol: {
                name: ElementVisualTool.getVisualExtensionProtocolName(),
                version: "0.5.1",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: Meta3d.ExtensionFileType.extensionPackageData
          ),
          "",
        )
    })

    \"and"("publish v1, v2", () => {
      getAllPublishNewestExtensionsStub.contents =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          Meta3dBsMost.Most.just([
            ExtensionTool.buildExtensionImplement(~file=v1.contents, ~version="0.5.0", ()),
            ExtensionTool.buildExtensionImplement(~file=v2.contents, ~version="0.5.1", ()),
          ]),
          _,
        )
    })

    CucumberAsync.execStep(\"when", "get and set newest visual extension", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      let initData = Obj.magic(1)

      ElementVisualTool.getAndSetNewestVisualExtension(
        ServiceTool.build(
          ~sandbox,
          ~loadExtension=Meta3d.Main.loadExtension->Obj.magic,
          ~getAllPublishNewestExtensions=getAllPublishNewestExtensionsStub.contents,
          (),
        ),
        dispatchStub.contents,
        isDebug,
      )
    })

    then("should dispatch SetVisualExtension action with v2", () => {
      dispatchStub.contents
      ->Obj.magic
      ->SinonTool.calledWith(
        FrontendUtils.ElementAssembleStoreType.SetVisualExtension({
          id: "",
          protocolIconBase64: "",
          newName: ElementVisualTool.getVisualExtensionName()->Some,
          isStart: false,
          data: {
            extensionPackageData: ExtensionTool.buildExtensionPackageData(
              ~name,
              ~protocol={
                name: ElementVisualTool.getVisualExtensionProtocolName(),
                version: "0.5.1",
              },
              (),
            ),
            extensionFuncData: matchAny,
          },
        }),
      )
      ->expect == true
    })
  })

  test(."render app", ({given, \"when", \"and", then}) => {
    let element1 = ref(Obj.magic(1))
    let v = ref(Obj.magic(1))
    let ui = ref(Obj.magic(1))
    let event = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let selectedExtensions = ref(list{})
    let selectedContributes = ref(list{})
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("prepare flag", () => {
      ElementVisualTool.prepareInitFlag()
      ElementVisualTool.prepareUpdateFlag()
    })

    \"and"("generate empty element contribute element1", () => {
      element1 :=
        ElementVisualTool.generateElementContribute(
          ServiceTool.build(
            ~sandbox,
            ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
            ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
            (),
          ),
          ElementVisualTool.buildEmptyContributeFileStr(),
        )->Meta3dCommonlib.Tuple2.getLast
    })

    \"and"("get visual extension v", () => {
      v :=
        Meta3d.Main.generateExtension(
          (
            {
              name: ElementVisualTool.getVisualExtensionName(),
              protocol: {
                name: ElementVisualTool.getVisualExtensionProtocolName(),
                version: "0.5.1",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: Meta3d.ExtensionFileType.extensionPackageData
          ),
          ElementVisualTool.buildEmptyExtensionFileStrWithOnInitAndOnUpdate(1, 11),
        )->ElementVisualTool.loadAndBuildVisualExtension(
          ServiceTool.build(~sandbox, ~loadExtension=Meta3d.Main.loadExtension->Obj.magic, ()),
          _,
        )
    })

    \"and"("generate extension ui", () => {
      ui :=
        ExtensionTool.generateExtension(
          ~name="meta3d-ui",
          ~protocolName="meta3d-ui-protocol",
          ~protocolVersion="^0.5.0",
          (),
        )->Meta3d.Main.loadExtension
    })

    \"and"("generate extension event", () => {
      event :=
        ExtensionTool.generateExtension(
          ~name="meta3d-event",
          ~protocolName="meta3d-event-protocol",
          ~protocolVersion="^0.5.1",
          (),
        )->Meta3d.Main.loadExtension
    })

    \"and"("generate contribute c1", () => {
      c1 := ContributeTool.generateContribute(~name="c1", ())->Meta3d.Main.loadContribute
    })

    \"and"("select ui", () => {
      let name = "meta3d-ui"

      selectedExtensions :=
        list{
          SelectedExtensionsTool.buildSelectedExtension(
            ~name,
            ~newName=None,
            ~id=name,
            ~data=ui.contents,
            (),
          ),
        }
    })

    \"and"("select event", () => {
      let name = "meta3d-event"

      selectedExtensions :=
        selectedExtensions.contents->Meta3dCommonlib.ListSt.push(
          SelectedExtensionsTool.buildSelectedExtension(
            ~name,
            ~newName=None,
            ~id=name,
            ~data=event.contents,
            (),
          ),
        )
    })

    \"and"("select c1", () => {
      let name = "c1"

      selectedContributes :=
        list{
          SelectedContributesTool.buildSelectedContribute(
            ~name,
            ~newName=None,
            ~id=name,
            ~data=c1.contents,
            (),
          ),
        }
    })

    CucumberAsync.execStep(\"when", "render app with ui, c1, v, element1", () => {
      let initData = Obj.magic(1)

      ElementVisualTool.renderApp(
        ServiceTool.build(
          ~sandbox,
          ~generateApp=Meta3d.Main.generateApp->Obj.magic,
          ~convertAllFileData=Meta3d.Main.convertAllFileDataForApp->Obj.magic,
          ~loadApp=Meta3d.Main.loadApp->Obj.magic,
          ~initExtension=(. meta3dState, extensionName, data) =>
            Meta3d.Main.initExtension(meta3dState, extensionName, data),
          ~updateExtension=(. meta3dState, extensionName, data) =>
            Meta3d.Main.updateExtension(meta3dState, extensionName, data),
          (),
        ),
        (selectedExtensions.contents, selectedContributes.contents),
        initData,
        (v.contents, element1.contents),
      )
    })

    \"and"("build app with ui, c1, v, element1", () => {
      ()
    })

    \"and"("v should be inited and updated", () => {
      (ElementVisualTool.getInitFlag(), ElementVisualTool.getUpdateFlag())->expect == (1, 11)
    })
  })
})