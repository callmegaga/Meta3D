let _getEnv = (): FrontendUtils.EnvType.env => #local

let _hiddenLoadding = %raw(`
    function(){
    document.querySelector("#loading").style.display = "none"
    }
    `)

let _buildFrontendService = (env): FrontendUtils.FrontendType.service => {
  backend: switch env {
  | #local => BackendCloudbase.buildFrontendService()
  | #production =>
    // TODO restore 4everland
    // Backend4everland.buildFrontendService()

    BackendCloudbase.buildFrontendService()
  },
  console: {
    error: (. errorMessage, durationOpt) =>
      FrontendUtils.ErrorUtils.error(errorMessage, durationOpt),
    errorWithExn: (. error, durationOpt) =>
      FrontendUtils.ErrorUtils.errorWithExn(error, durationOpt),
  },
}

_hiddenLoadding()

let service = _buildFrontendService(_getEnv())

service.backend.init(InitUtils.getBackendEnv(_getEnv()))->Meta3dBsMost.Most.drain->Js.Promise.then_(_ => {
  Js.log("init backend success")->Js.Promise.resolve
}, _)->ignore

ReactDOM.render(
  <React.StrictMode>
    <AppStore.AppStore.Provider store=AppStore.store>
      <App service env={_getEnv()} />
    </AppStore.AppStore.Provider>
  </React.StrictMode>,
  ReactDOM.querySelector("#root")->Meta3dCommonlib.OptionSt.getExn,
)
