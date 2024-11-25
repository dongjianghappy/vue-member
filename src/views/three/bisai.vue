<template>
<div class="absolute" style="top: 10px; right: 10px">
  <span @click="handleExit">退出星球空间</span>
  <span class="ml10" @click="hadnleEdit">进入编辑模式</span>
</div>
  <!-- <MoveInfo /> -->
  <CarInfo :data="currentCar" />
  <Screen :data="{THREE, scene, camera, car, store, DRACOLoader, GLTFLoader, RGBELoader, CSS2DObject, CSS2DRenderer}" />
</template>

<script setup lang="ts">
import {
  onMounted,
  computed,
  ref,
  useStore,
} from '@/utils'


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { createText } from 'three/examples/jsm/webxr/Text2D.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


import { control, gridHelper, starKay, userStar, light, plane, glassFn, geometryEvent } from './utils/utils'
import { lineRoad, roundRoad, crossRoad } from './utils/road'
import { car, closeUp, closeUpAnimate, closeUps } from './utils/car'
import { door } from './utils/send'
import { handleBroadcast } from '../../utils/fn'



import Screen from './components/screen.vue'
import MoveInfo from './components/moveInfo.vue'
import CarInfo from './components/carInfo.vue'

const currentScene = computed(() => store.getters['three/config'].cangpin);
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
let _control: any = ref("")


function init(){
  
  const { background_color } = currentScene.value

  scene.background = new THREE.Color( background_color || 0x000000);
  camera.position.set(0, 250, 635)
  camera.lookAt(0, 0, 0)
  
  // 渲染
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  

  const geometry = new THREE.BoxGeometry( 50, 50, 50 ); 
  const material: any = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
  cube = new THREE.Mesh( geometry, material );
  cube.position.y = 35
  cube.userData.kind = "home"
  scene.add( cube );

geometryEvent({
    THREE,
    scene,
    camera,
    handleBroadcast,
    goHomeScene: () => {
      cancelAnimationFrame(animateName);
      // 清除以下内容
      if (renderer) {
          renderer.forceContextLoss(); // 强制释放WebGL上下文
          renderer.domElement.remove(); // 从DOM中移除canvas元素
          renderer.dispose(); // 释放渲染器使用的资源
      }
      if (scene) {
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
      // sessionStorage.setItem('scene', 'home')
      // window.location.reload()
      store.commit('three/setCurrentScene', 'home')
    }
  })
  animate()
}

var animate = function () {
  animateName = requestAnimationFrame(animate);

  cube.rotation.y += 0.01
  renderer.render(scene, camera);
};

function threeConfig() {
  store.dispatch('three/config', {
    data: {
      type: 'home'
    }
  }).finally(() => {
    init()
  })
}

onMounted(() => {
  threeConfig()
  
})
</script>
