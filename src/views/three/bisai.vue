<template>

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


			import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
			import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
			import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
			import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
      import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';



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




let scene: any, camera: any, renderer: any, labelRenderer: any, composer: any
let cube: any, cube1: any, animateName: any
let dragDoor: any
console.log(THREE);
const store = useStore()
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
let _control: any = ref("")
			const params = {
				threshold: 0,
				strength: 2,
				radius: 0.5,
				exposure: 1
			};

function init(){
  
  const { background_color } = currentScene.value

  scene.background = new THREE.Color( 0x000000);
  camera.position.set(0, 250, 635)
  camera.lookAt(0, 0, 0)
  
  // 渲染
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const light = new THREE.AmbientLight( 0x404040 ); // 柔和的白光
scene.add( light );

  const geometry = new THREE.BoxGeometry( 50, 50, 50 ); 
  const material: any = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
  cube = new THREE.Mesh( geometry, material );
  cube.position.y = 35
  cube.userData.kind = "home"
  scene.add( cube );

  cube.material.emissive.set(0xff0000) // 白色发光
  cube.material.emissiveIntensity =1 // 设置材质的发光强度
  cube.material.sepcular =0x000000 // 设置材质的反射颜色

  const geometry1 = new THREE.BoxGeometry( 50, 50, 50 ); 
  const material2: any = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
  cube1 = new THREE.Mesh( geometry1, material2 );
  cube1.position.y = 250
  cube1.userData.kind = "home"
  scene.add( cube1 );


        				composer = new EffectComposer( renderer );
        const renderScene = new RenderPass( scene, camera );

				const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
				bloomPass.threshold = params.threshold;
				bloomPass.strength = params.strength;
				bloomPass.radius = params.radius;

        const v2 = new THREE.Vector2( window.innerWidth, window.innerHeight )
        const outlinePass = new OutlinePass(v2, scene, camera)

        outlinePass.edgeGlow = .5 // 发光强度
        outlinePass.usePatternTextture = false // 是否使用纹理图案
        outlinePass.edgeThickness = 1 // 边缘浓度
        outlinePass.edgeStrength = 5 // 边缘的强度,值越高边范围越大
        outlinePass.pulsePeriod = 1 // 闪烁频率,值越大频率越低
        outlinePass.visibleEdgeColor.set('#ffff00') // 呼吸显示的颜色
        outlinePass.hiddenEdgeColor.set('#ff0000') // 不可见边缘的颜色



        outlinePass.selectedObjects = [cube1]
debugger
				const outputPass = new OutputPass();


				composer.addPass( renderScene );
				composer.addPass( bloomPass );
        composer.addPass( outlinePass );
				composer.addPass( outputPass );



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
  // renderer.render(scene, camera);
  composer.render()
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
