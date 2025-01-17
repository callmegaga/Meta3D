open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let resetElementAssemble = dispatch => {
    dispatch(FrontendUtils.ElementAssembleStoreType.ResetWhenSwitch)
  }
}

@react.component
let make = (
  ~service: service,
  ~account,
  ~selectedPackagesFromMarket: selectedPackagesFromMarket,
  ~selectedExtensionsFromMarket: selectedExtensionsFromMarket,
  ~selectedContributesFromMarket: selectedContributesFromMarket,
) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  service.react.useEffectOnce(() => {
    Method.resetElementAssemble(dispatch)

    ((), None)
  })

  <Layout>
    <Layout.Content>
      <Space direction=#horizontal size=#small>
        <Publish service account />
        <ApController service />
        <CanvasController service />
      </Space>
    </Layout.Content>
    <Layout>
      <Layout.Sider theme=#light>
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel header="Packages" key="1">
            <Packages service selectedPackagesFromMarket />
          </Collapse.Panel>
          <Collapse.Panel header="Extensions" key="2">
            <Extensions service selectedExtensionsFromMarket />
          </Collapse.Panel>
          <Collapse.Panel header="Contributes" key="3">
            <Contributes service selectedContributesFromMarket />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Packages" key="4">
            <SelectedPackages service />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Extensions" key="5">
            <SelectedExtensions service />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Contributes" key="6">
            <SelectedContributes service />
          </Collapse.Panel>
        </Collapse>
      </Layout.Sider>
      <Layout.Content>
        <Visual service />
      </Layout.Content>
      <Layout.Sider theme=#light>
        <ExtensionInspector service />
        <ContributeInspector />
        <ApInspector service />
      </Layout.Sider>
    </Layout>
  </Layout>
}
