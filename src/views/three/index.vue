<template>
  <Index :data="{ THREE, scene, camera, renderer, DragControls, ThreeFn, lightType, store, DRACOLoader, GLTFLoader, RGBELoader, CSS2DObject, CSS2DRenderer, createText, RectAreaLightHelper }" />
</template>

<script setup lang="ts">
import {
  onMounted,
  computed,
  ref,
  provide,
  useStore,
  codings,
} from '@/utils'

import { lightType } from '@/assets/const'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { createText } from 'three/examples/jsm/webxr/Text2D.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

// import * as THREE from 'three/examples/build/three.module';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// import { createText } from 'three/examples/jsm/webxr/Text2D.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
// import { DragControls } from 'three/examples/jsm/controls/DragControls';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


// import { control, gridHelper, starKay, userStar, light, plane, glassFn, geometryEvent } from './utils/utils'
// import { lineRoad, roundRoad, crossRoad } from './utils/road'
// import { car, closeUp, closeUpAnimate, closeUps } from './utils/car'
// import { door } from './utils/send'
import { handleBroadcast } from '../../utils/fn'
import ThreeFn from './utils/index'

import Index from './components/index.vue'
import NavList from './components/navList.vue'
import Screen from './components/screen.vue'
import MoveInfo from './components/moveInfo.vue'
import Info from './attributes/index.vue'
import Item from './aside/item.vue'

const coding = codings.three
const currentScene = computed(() => store.getters['three/config'].home);
const modelType = computed(() => store.getters['three/modelType']);
const carList = computed(() => store.getters['three/carList']);
const currentCar = computed(() => store.getters['three/currentCar']);
const keys = computed(() => store.getters['three/keys']);
const stars = computed(() => store.getters['three/stars']);


let scene: any, camera: any, renderer: any, labelRenderer: any
let cube: any, animateName: any
let dragDoor: any
console.log(THREE);
const store = useStore()
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
renderer = new THREE.WebGLRenderer({ antialias: true });
let _control: any = ref("")

let win: any = window
win.THREE = THREE
win.scene = scene
win.ThreeFn = ThreeFn
win.createText = createText
win.lightType = lightType
win.store = store

// 深层组件传递
provide('parentsData', {
  THREE,
  scene,
  ThreeFn,
  GLTFLoader,
  DRACOLoader,
  CSS2DObject
})

function init(){
  
  const { background_color } = currentScene.value

  scene.background = new THREE.Color( background_color || 0x000000);
  camera.position.set(0, 250, 635)
  camera.lookAt(0, 0, 0)
  
  // 渲染
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize( window.innerWidth, window.innerHeight );
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none';
  labelRenderer.domElement.id = "three-div"
  document.body.appendChild( labelRenderer.domElement );
  
  const controls = new OrbitControls( camera, labelRenderer.domElement );
  controls.minDistance = 5;
  controls.maxDistance = 100;

  const geometry = new THREE.BoxGeometry( 50, 50, 50 ); 
  const material: any = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
  cube = new THREE.Mesh( geometry, material );
  cube.position.y = 35
  cube.userData.kind = "send"
  // scene.add( cube );

  // 传送门
  const geometry1 = new THREE.BoxGeometry( 50, 50, 50 ); 
  const material1: any = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
  const cubes: any = new THREE.Mesh( geometry1, material1 );
  cubes.position.x = 510
  cubes.position.y = 25
  cubes.position.z = -650
  // scene.add( cubes );

  ThreeFn.starKay({
    THREE,
    scene,
    config: currentScene.value
  })

  // ThreeFn.light({
  //   THREE,
  //   scene,
  // })

  // ThreeFn.testplane({
  //   THREE,
  //   scene,
  //   camera,
  //   renderer,
  //   DragControls,
  //   store,
  //   position: {
  //     x: 350,
  //     z: -350
  //   },
  //   _control
  // })

  // ThreeFn.gridHelper({
  //   THREE,
  //   scene,
  // })

  _control = ThreeFn.control({
    camera, renderer, OrbitControls
  })

  ThreeFn.plane({
    config: currentScene.value,
    THREE,
    scene,
    createText,
    size: 1500,
    divisions: 1500
  })

  road()
  glass1()
  sendDoor()
  ThreeFn.closeUp({
    camera,
    currentCar,
    modelType: modelType.value,
    keys: keys.value
  })
  ThreeFn.geometryEvent({
    THREE,
    scene,
    camera,
    store,
    handleBroadcast,
    createText,
    // 前往用户星球
    goUserStar: () => {
      // closeUpAnimate()
      // closeUpAnimate({scene, camera, obj: {
      //   start: { x: parseInt(camera.position.x), y: parseInt(camera.position.y), z: parseInt(camera.position.z) },
      //   end: { x: parseInt('510'), y: parseInt('50'), z: parseInt('-650') }
      // }})
    },
    goBisaiScene: () => {
      cancelAnimationFrame(animateName);

      // 清除以下内容
      let threeDiv: any = document.getElementById('three-div')
      threeDiv.remove()

      if (renderer) {
          renderer.forceContextLoss(); // 强制释放WebGL上下文
          renderer.domElement.remove(); // 从DOM中移除canvas元素
          renderer.dispose(); // 释放渲染器使用的资源
      }
      if (scene) {
          scene.children = []
          scene.traverse((child: any) => {
              if (child.isMesh) {
                  child.geometry.dispose();
                  if (child.material) {
                      child.material.dispose();
                  }
              }
          });
          scene.children = []
          scene = null; // 设置场景为null
      }
      if (camera) {
          camera = null; // 设置相机为null
      }
      let camvas = document.getElementsByTagName("canvas")[0]
      if(camvas && camvas.dataset.engine === 'three.js r169'){
        camvas.remove()
      }
      // sessionStorage.setItem('scene', 'cangpin')
      // window.location.reload()
      store.commit('three/setCurrentScene', 'cangpin')
    }
  })
  animate()
}

var animate = function () {
  animateName = requestAnimationFrame(animate);
  labelRenderer.render( scene, camera );
  _control.update();
  
  // 车辆路线自动行驶
  for(let i = 0 ; i < carList.value.length; i++){
    
    let car: any = carList.value[i]
    let roadLine = car.userData.roadLine
    if(roadLine.progress >= 1 - roadLine.velocity){
      roadLine.progress = 0
    }
    
      if(roadLine.isRun == '1'){
        const point = car.roadLine.getPointAt(roadLine.progress); //获取样条曲线指定点坐标
        const pointBox = car.roadLine.getPointAt(roadLine.progress + roadLine.velocity); //获取样条曲线指定点坐标
        
        if(car.closeUp){
          ThreeFn.closeUps({
            camera,
            currentCar: {
              value: carList.value[i]
            },
            point,
            pointBox
          })
          // camera.position.set(pointBox.x, 25, pointBox.z)
          // camera.lookAt(point.x, point.y, point.z)
        }else{
          camera.lookAt(point.x, point.y, point.z)
          _control.target.set(pointBox.x, pointBox.y, pointBox.z)
        }

        car.position.set(point.x, point.y, point.z);
        roadLine.progress += roadLine.velocity;

        var mtx = new THREE.Matrix4()  //创建一个4维矩阵

        mtx.lookAt(car.position, pointBox, car.up) //设置朝向

        mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, 0, 0)))

        var toRot = new THREE.Quaternion().setFromRotationMatrix(mtx)  //计算出需要进行旋转的四元数值

        car.quaternion.slerp(toRot, 0.6)
      }
  }

  // 轨道动画
  
  let wx = scene.children.filter((item: any) => item.kind == 'wuti' && item.userData && item.userData.roadLine && item.userData.roadLine.isRun == '1')


  wx.forEach((item: any) => {
    let roadLine = item.userData.roadLine
    
    if(roadLine.progress >= 1 - roadLine.velocity){
      roadLine.progress = 0
    }

    const point = item.roadLine.getPointAt(roadLine.progress); //获取样条曲线指定点坐标
    const pointBox = item.roadLine.getPointAt(roadLine.progress + roadLine.velocity); //获取样条曲线指定点坐标
  
    // camera.lookAt(point.x, point.y, point.z)
    // _control.target.set(pointBox.x, pointBox.y, pointBox.z)

    item.position.set(point.x, point.y, point.z);
    roadLine.progress += roadLine.velocity;

    var mtx = new THREE.Matrix4()  //创建一个4维矩阵

    mtx.lookAt(item.position, pointBox, item.up) //设置朝向

    mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, 0, 0)))

    var toRot = new THREE.Quaternion().setFromRotationMatrix(mtx)  //计算出需要进行旋转的四元数值

    item.quaternion.slerp(toRot, 0.6)

  })
  

  // 星球动画旋转
  stars.value.forEach((item: any) => {
    item.rotation.y += 0.01
  });
  cube.rotation.y += 0.01

  // 自定义物体动画设置
  const bbb = scene.children.filter((item: any) => item.userData.fid)
  bbb.forEach((item: any) => {
    if(item.userData.content){
      const con = item.userData.content.animation
      if(con && con.x){
        item.rotation.x += 0.01
      }
      if(con && con.y){
        item.rotation.y += 0.01
      }
      if(con && con.z){
        item.rotation.z += 0.01
      }
    }
  });
  
  renderer.render(scene, camera);
};

// 道路
function road(){
  const { road: { basic_road: { road_width }} } = currentScene.value

  // 左侧道路
  ThreeFn.lineRoad({
    THREE,
    scene,
    position: {
      x: -450,
      z: 0
    },
    width: road_width,
    height: 750
  })

  // 左上角
  ThreeFn.roundRoad({
    THREE,
    scene,
    position: {
      x: -425,
      z: -425
    },
    width: road_width
  })

  // 上面道路
  ThreeFn.lineRoad({
    THREE,
    scene,
    position: {
      x: 0,
      z: -450
    },
    width: road_width,
    height: 750,
    rotateZ: 1.5721
  })

  // 右上角
  ThreeFn.roundRoad({
    THREE,
    scene,
    position: {
      x: 425,
      z: -425
    },
    width: road_width,
    rotateZ: 1.5721
  })

  // 右侧道路
  ThreeFn.lineRoad({
    THREE,
    scene,
    position: {
      x: 450,
      z: 0
    },
    width: road_width,
    height: 750
  })

  // 右下角
  ThreeFn.roundRoad({
    THREE,
    scene,
    position: {
      x: 425,
      z: 425
    },
    width: road_width,
    rotateZ: 3.2442
  })

  // 下面道路
  ThreeFn.lineRoad({
    THREE,
    scene,
    position: {
      x: 0,
      z: 450
    },
    width: road_width,
    height: 750,
    rotateZ: 1.5721
  })

  // 左下角
  ThreeFn.roundRoad({
    THREE,
    scene,
    position: {
      x: -425,
      z: 425
    },
    width: road_width,
    rotateZ: -1.5721
  })
}

// 草坪
function glass1(){
  const { glass } = currentScene.value

  // 左侧草坪
  ThreeFn.glassFn({
    THREE,
    scene,
    position: {
      x: -450,
      z: -500
    },
    widthSegments: 3,
    number: 950/glass.glass_width,
    width: glass.glass_width,
    height: glass.glass_height
  })

  // 顶部草坪
  ThreeFn.glassFn({
    THREE,
    scene,
    position: {
      x: -500,
      z: -450
    },
    widthSegments: 3,
    number: 950/glass.glass_width,
    width: glass.glass_width,
    height: glass.glass_height,
    rotateY: 1.5721
  })

  // 右侧草坪
  ThreeFn.glassFn({
    THREE,
    scene,
    position: {
      x: 450,
      z: -500
    },
    widthSegments: 3,
    number: 950/glass.glass_width,
    width: glass.glass_width,
    height: glass.glass_height
  })

  // 底部草坪
  ThreeFn.glassFn({
    THREE,
    scene,
    position: {
      x: -500,
      z: 450
    },
    widthSegments: 3,
    number: 950/glass.glass_width,
    width: glass.glass_width,
    height: glass.glass_height,
    rotateY: 1.5721
  })
}

// 传送门
function sendDoor(){
  ThreeFn.door({
    THREE,
    scene,
    camera,
    renderer,
    DragControls,
    store,
    position: {
      x: 350,
      z: -350
    },
    _control
  })
}





function threeConfig() {
  store.dispatch('three/config', {
    data: {
      type: 'home'
    }
  }).finally(() => {
    init()
  })
  if(!sessionStorage.getItem('threeConfig')){
    // store.dispatch('three/config', {
    //   data: {
    //     type: 'home'
    //   }
    // }).finally(() => {
    //   init()
    // })
  }else{
    let config: any = sessionStorage.getItem('threeConfig')
    store.commit("three/setConfig", JSON.parse(config))
    init()
    setTimeout(() => {
      handleBroadcast("hi，您好，欢迎来到我的星球世界，开始我的太空旅行")
    }, 3000)
    getUser()
  }
}

// 获取用户
function getUser(param: any = {}) {
  store.dispatch('common/Fetch', {
    api: 'userZone',
    data: {
      page: 1,
      pagesize: 360
    }
  }).then((res) => {
    ThreeFn.userStar({
      THREE,
      scene,
      store,
      config: currentScene.value,
      userList: res.result.list || []
    })
  })
}

// 路线
function getTrackLine(param: any = {}) {
  store.dispatch('three/trackLine', {
    data: {
      coding: coding.road_line,
    }
  })
}

function getSceneItem(){
store.dispatch('common/Fetch', {
    api: 'renderThreeItem'
  }).then((res) => {
    
    res.result && res.result.forEach((item: any) => {
      ThreeFn[item.value]({
        THREE,
        scene,
        camera,
        renderer,
        DragControls,
        createText,
        store,
        ThreeFn,
        lightType,
        position: {
          x: 0,
          z: 0
        },
        widthSegments: 3,
        number: 1,
        // width: item.content.parameters.width,
        // height: item.content.parameters.height,
        data: item,
        actionType: 'render'
      })
    })
  })
}

onMounted(() => {
  threeConfig()
  getTrackLine()
  getSceneItem()  
})
</script>
