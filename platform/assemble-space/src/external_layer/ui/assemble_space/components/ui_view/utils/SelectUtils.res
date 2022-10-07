let buildEmptySelectOptionValue = () => "empty"

let isEmptySelectOptionValue = value => value === buildEmptySelectOptionValue()

let buildSelect = (onChange, defaultValue, values) => {
  open FrontendUtils.Antd
  // %%raw("import 'antd/dist/antd.css'")

  <Select key={defaultValue} defaultValue={defaultValue} onChange>
    <Select.Option key={buildEmptySelectOptionValue()} value={buildEmptySelectOptionValue()}>
      {React.string({buildEmptySelectOptionValue()})}
    </Select.Option>
    {values
    ->Meta3dCommonlib.ArraySt.map(value => {
      <Select.Option key={value} value={value}> {React.string({value})} </Select.Option>
    })
    ->React.array}
  </Select>
}



let buildSelect2 = () => React.null