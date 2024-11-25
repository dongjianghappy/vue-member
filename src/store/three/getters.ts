const getters = {
  isEdit:  (state: any) => state.isEdit,
  currentScene:  (state: any) => state.currentScene,
  trackLine: (state: any) => state.trackLine || [],
  sceneLayer: (state: any) => state.sceneLayer || [],
  lightLayer: (state: any) => state.lightLayer || [],
  config: (state: any) => state.config,
  modelType: (state: any) => state.modelType,
  carList: (state: any) => state.carList || [],
  currentCar: (state: any) => state.currentCar || {},
  keys: (state: any) => state.keys,
  stars: (state: any) => state.stars || [],
  currentEdit: (state: any) => state.currentEdit,
  roadLoadList: (state: any) => state.roadLoadList || [],
  roadLoad: (state: any) => state.roadLoad || {},
  geometryList: (state: any) => state.geometryList || [],
  geometry: (state: any) => state.geometry || {},
  geometryInfo: (state: any) => state.geometryInfo || {},
  lightList: (state: any) => state.lightList || [],
  lightInfo: (state: any) => state.lightInfo || {},
  helperList: (state: any) => state.helperList || [],
  helperInfo: (state: any) => state.helperInfo || {},

}

export default getters;