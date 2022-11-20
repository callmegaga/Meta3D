open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectUIControl = (service, dispatch, id) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SelectSelectedUIControl(
        (service.meta3d.hasChildren, service.meta3d.serializeUIControlProtocolConfigLib),
        id,
      ),
    )
  }

  let useSelector = ({selectedUIControls}: FrontendUtils.ElementAssembleStoreType.state) => {
    selectedUIControls
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let selectedUIControls = ReduxUtils.ElementAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  <List
    grid={{gutter: 16, column: 1}}
    dataSource={selectedUIControls->Meta3dCommonlib.ListSt.toArray->Meta3dCommonlib.Log.printForDebug}
    renderItem={({id, protocolIconBase64, name, data} as contribute) => {
      Js.log("a")
      <List.Item>
        <Card
          key={id}
          onClick={_ => {
            Method.selectUIControl(service, dispatch, id)
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<img
            style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={protocolIconBase64}
          />}>
          <Card.Meta style={ReactDOM.Style.make(~width="100px", ())} title={React.string(name)} />
        </Card>
      </List.Item>
    }}
  />
}
