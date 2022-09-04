const getters = {
  graphType: (state: any) => state.graphType,
  nodeData: (state: any) => state.nodeData || {}
}

export default getters;