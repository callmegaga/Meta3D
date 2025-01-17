open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _dispatchAction = (canvasData, dispatch) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SetCanvasData(canvasData))
  }

  let _setData = (dispatch, buildCanvasDataFunc, canvasData) => {
    buildCanvasDataFunc(canvasData)->_dispatchAction(dispatch)
  }

  let setWidth = (dispatch, canvasData, width) => {
    _setData(
      dispatch,
      canvasData => {
        ...canvasData,
        width,
      },
      canvasData,
    )
  }

  let setHeight = (dispatch, canvasData, height) => {
    _setData(
      dispatch,
      canvasData => {
        ...canvasData,
        height,
      },
      canvasData,
    )
  }

  let useSelector = ({canvasData}: FrontendUtils.ApAssembleStoreType.state) => {
    canvasData
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  let {width, height} as canvasData = ReduxUtils.ApAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  <Space direction=#horizontal size=#small>
    <Typography.Text> {React.string(`画布大小：`)} </Typography.Text>

    <Input
      value={width->Js.Int.toString}
      onChange={e => {
        Method.setWidth(
          dispatch,
          canvasData,
          e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
        )
      }}
    />
    <Input
      value={height->Js.Int.toString}
      onChange={e => {
        Method.setHeight(
          dispatch,
          canvasData,
          e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
        )
      }}
    />
  </Space>
}
