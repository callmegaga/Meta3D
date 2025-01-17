open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/fix_assembleSpace_bug.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and", initialState, store) => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })

    \"and"("init store", () => {
      store := initialState
    })
  }

  test(."fix \"enter AssembleSpace should reset\" bug", ({given, \"when", \"and", then}) => {
    let store = ref(Obj.magic(1))
    let a: FrontendUtils.BackendCloudbaseType.protocol = BackendCloubaseTool.buildProtocol(
      ~name="a",
      ~version="1.0.1",
      (),
    )
    let (a1, _) = ExtensionTool.buildSelectedExtension(
      ~protocolName=a.name,
      ~protocolVersion=a.version,
      (),
    )
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and", AssembleSpaceStore.initialState, store)

    given(
      "select extension a1 for protocol a in Extensions",
      () => {
        store :=
          ExtensionsTool.selectExtension(
            ~dispatch=ReduxTool.ApAssemble.buildDispatch(
              AssembleSpaceStore.reducer,
              store.contents,
            ),
            ~iconBase64=a.iconBase64,
            ~extension=a1,
            ~protocolConfigStr=None,
            (),
          )
      },
    )

    \"when"(
      "enter AssembleSpace",
      () => {
        store := AssembleSpaceTool.reset(~dispatch=AssembleSpaceStore.reducer(store.contents))
      },
    )

    \"and"(
      "render SelectedExtensions",
      () => {
        ()
      },
    )

    then(
      "should reset store",
      () => {
        let {selectedExtensions, inspectorCurrentExtensionId} = store.contents.apAssembleState

        (selectedExtensions, inspectorCurrentExtensionId)->expect == (list{}, None)
      },
    )

    \"and"(
      "should show nothing",
      () => {
        SelectedExtensionsTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useSelector=ReduxTool.ApAssemble.useSelector(store.contents),
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })
})
