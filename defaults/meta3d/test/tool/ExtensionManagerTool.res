let hasExtension = (state: Meta3dType.Index.state, protocolName) => {
  state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.has(protocolName)
}

let hasContribute = (state: Meta3dType.Index.state, protocolName) => {
  state.contributeMap->Meta3dCommonlib.ImmutableHashMap.has(protocolName)
}
