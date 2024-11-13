export interface State {
  currentScene: any;
  config: any;
  modelType: any;
  carList: any;
  currentCar: any;
  keys: any;
  stars: any;
  geometryList: any;
  geometry: any;
  geometryInfo: any;
}


const initState: State = {
  currentScene: "home",
  config: {},
  modelType: ['default', 'back', 'left', 'head', 'right', 'top'],
  carList: [],
  currentCar: {},
  keys: {
    top: false,
    right: false,
    bottom: false,
    left: false
  },
  stars: [],
  geometryList: [],
  geometry: {},
  geometryInfo: {
    fid: '',
    uuid: '',
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    parameters: {
      with: 0,
      height: 0
    },
    material: {
      color: '000'
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    }
  }
}

export default initState;