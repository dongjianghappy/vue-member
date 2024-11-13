const getters = {
  currentScene:  (state: any) => state.currentScene,
  config: (state: any) => state.config,
  modelType: (state: any) => state.modelType,
  carList: (state: any) => state.carList || [],
  currentCar: (state: any) => state.currentCar || {},
  keys: (state: any) => state.keys,
  stars: (state: any) => state.stars || [],
  geometryList: (state: any) => state.geometryList || [],
  geometryInfo: (state: any) => state.geometryInfo || {},
}

export default getters;