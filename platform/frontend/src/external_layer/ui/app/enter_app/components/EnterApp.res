open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

let _getEnv = (): FrontendUtils.EnvType.env => #production

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let url = RescriptReactRouter.useUrl()

  let {account, appName} = AppStore.useSelector(({enterAppState}: AppStore.state) => enterAppState)

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadFinish, setIsDownloadFinish) = React.useState(_ => false)

  React.useEffect1(() => {
    FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
      let account = FrontendUtils.UrlSearchUtils.get(url.search, "account")
      let appName = FrontendUtils.UrlSearchUtils.get(url.search, "appName")
      // let account = account->Meta3dCommonlib.OptionSt.getExn
      // let appName = appName->Meta3dCommonlib.OptionSt.getExn



      service.backend.init(InitUtils.getBackendEnv(_getEnv()))->Meta3dBsMost.Most.drain->Js.Promise.then_(_ => {
        service.backend.findPublishApp(.
          progress => setDownloadProgress(_ => progress),
          account,
          appName,
        )
        ->Meta3dBsMost.Most.observe(
          appBinaryFile => {
            setIsDownloadFinish(_ => true)

            Js.Nullable.isNullable(appBinaryFile)
              ? {
                  Message.error(.
                    {j`account: ${account} appName: ${appName} has no published app`},
                    10,
                  )
                }
              : {
                  Meta3dCommonlib.NullableSt.getExn(appBinaryFile)
                  ->Meta3d.Main.loadApp
                  ->Meta3d.Main.startApp
                }
          },
          _,
        )
      }, _)
      
      ->Js.Promise.catch(
        e => {
          service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
        },
        _,
      )
      ->ignore


    }, 5->Some)

    None
  }, [])

  <>
    {!isDownloadFinish
      ? <p> {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})} </p>
      : React.null}
  </>
}
