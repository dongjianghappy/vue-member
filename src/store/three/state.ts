import { color } from "@/assets/common_const";
import { image } from "@/utils/fn";
import { roadLine } from "@/views/three/utils/item";
import { geometryInfo, lightInfo, textInfo, helperInfo } from "@/views/three/utils/data/geometry";

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
  textInfo: Object;
  roadLoadList: any;
  roadLoad: any;
  helperList: any;
  helperInfo: any;
  lightList: any;
  lightInfo: Object;
  geometryType: any;
  geometryList: any;
  geometry: any;
  geometryInfo: Object;
}


const initState: State = {
  isEdit: false,
  currentScene: "home",
  currentTool: {},
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
  textInfo: { ...textInfo },
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
  helperInfo: { ...helperInfo },
  lightList: [],
  lightInfo: {...lightInfo},
  geometryType: ['box', 'capsule', 'circle', 'cone', 'cylinder'],
  geometryList: [],
  geometry: {},
  geometryInfo: {...geometryInfo}
  // geometryInfo: {
  //   fid: '',
  //   name: '',
  //   uuid: '',
  //   type: '',
  //   visible: true,
  //   source: 'item',
  //   roadLine: {
  //     id: '',
  //     isRun: 0,
  //     progress: 0,
  //     velocity: 0.001
  //   },
  //   position: {
  //     x: 0,
  //     y: 0,
  //     z: 0
  //   },
  //   parameters: {},
  //   material: {
  //     isMorePlane: '0',
  //     color: '#000',
  //     image: '',
  //     map: [],
  //     text: {
  //       content: '',
  //       color: '',
  //       size: '',
  //       position: {
  //         x: 0,
  //         y: 0,
  //         z: 0
  //       }
  //     }
  //   },
  //   rotation: {
  //     x: 0,
  //     y: 0,
  //     z: 0
  //   },
  //   event: {
  //     status: 1,
  //     target: ""
  //   },
  //   voice: {
  //     audio: '',
  //     broadcast: '',
  //     speech: ''
  //   },
  //   animation: {
  //     x: 0,
  //     y: 0,
  //     z: 0
  //   }
  // }
}

export default initState;