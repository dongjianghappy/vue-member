import { color } from "@/assets/common_const";
import { image } from "@/utils/fn";
import { roadLine } from "@/views/three/utils/item";

export interface State {
  isEdit: any;
  currentScene: any;
  currentTool: any;
  trackLine: any;
  sceneLayer: any;
  lightLayer: any;
  config: any;
  modelType: any;
  carList: any;
  currentCar: any;
  keys: any;
  stars: any;
  currentEdit:any;
  textInfo: any;
  roadLoadList: any;
  roadLoad: any;
  helperList: any;
  helperInfo: any;
  lightList: any;
  lightInfo: any;
  geometryType: any;
  geometryList: any;
  geometry: any;
  geometryInfo: any;
}


const initState: State = {
  isEdit: false,
  currentScene: "home",
  currentTool: '',
  trackLine: [],
  sceneLayer: [],
  lightLayer: [],
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
  textInfo: {
    fid: 'text',
    content: '',
    color: '',
    size: '',
    position: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  currentEdit: "",
  roadLoadList: [],
  roadLoad: {
    name: '',
    type: '',
    description: '',
    points: [],
    status: '1'
  },
  helperList: [],
  helperInfo: {
    fid: '',
    name: '',
    uuid: '',
    type: '',
    color: '',
    parameters: {},
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  lightList: [],
  lightInfo: {
    fid: '',
    name: '',
    uuid: '',
    type: '',
    visible: true,
    parameters: {
      color: '',
      intensity: '1', // 默认值为 1
    },
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  geometryType: ['box', 'capsule', 'circle', 'cone', 'cylinder'],
  geometryList: [],
  geometry: {},
  geometryInfo: {
    fid: '',
    name: '',
    uuid: '',
    type: '',
    visible: true,
    roadLine: {
      id: '',
      isRun: 0,
      progress: 0,
      velocity: 0.001
    },
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    parameters: {},
    material: {
      isMorePlane: '0',
      color: '#000',
      image: '',
      map: [],
      text: {
        content: '',
        color: '',
        size: '',
        position: {
          x: 0,
          y: 0,
          z: 0
        }
      }
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    event: {
      status: 1,
      target: ""
    },
    voice: {
      audio: '',
      broadcast: '',
      speech: ''
    },
    animation: {
      x: 0,
      y: 0,
      z: 0
    }
  }
}

export default initState;