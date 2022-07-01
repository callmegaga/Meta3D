@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  {
    switch url.path {
    | list{"Login"} => <Login />
    | list{"Register"} => <Register />
    | list{"ExtensionShop"} => <ExtensionShop />
    | list{"ContributeShop"} => <ContributeShop />
    | list{}
    | _ =>
      <Index />
    }
  }
}