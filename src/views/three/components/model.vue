<template>
<div id="webgl" style="height: 190px;"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import {
  defineProps,
  ref,
  computed,
  useStore,
  onMounted,
  watch
} from '@/utils'

import { control, light } from '../utils/utils'
import detailVue from '@/views/content/visitor/components/detail.vue';

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

let scene: any, camera: any, renderer: any

// 监听路由
watch(props, (newValues, prevValues) => {
  scene.children = scene.children.filter((item: any) => item.userData.name !== '0000')
  cars()
}, {
  deep: true
})

function init(){

  let el: any = document.getElementById("webgl")

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 1, 10000);
  scene.background = new THREE.Color(0x666666);
  camera.position.set(-25, 25, -25)
  camera.lookAt(0, 0, 0)

  // 渲染
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(el.clientWidth, el.clientHeight);
  
  el.appendChild(renderer.domElement);

  cars()
  



  light({
    THREE,
    scene,
  })

  control({
    camera, renderer, OrbitControls
  })

  animate()
}

function cars(){
  const { color } = props.data

  const bodyMaterial = new THREE.MeshPhysicalMaterial( {
    color: color || 0xff0000, metalness: 1.0, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03
  } );

  const detailsMaterial = new THREE.MeshStandardMaterial( {
    color: 0xffffff, metalness: 1.0, roughness: 0.5
  } );

  const glassMaterial = new THREE.MeshPhysicalMaterial( {
    color: 0xffffff, metalness: 0.25, roughness: 0, transmission: 1.0
  } );

  // Car

  const shadow = new THREE.TextureLoader().load( '/three/models/gltf/ferrari_ao.png' );

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath( '/three/jsm/libs/draco/gltf/' );

  const loader = new GLTFLoader();
  loader.setDRACOLoader( dracoLoader );

  loader.load( '/three/models/gltf/ferrari.glb', function ( gltf: any ) {

    const carModel = gltf.scene.children[ 0 ];

    carModel.getObjectByName( 'body' ).material = bodyMaterial;

    carModel.getObjectByName( 'rim_fl' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_fr' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_rr' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_rl' ).material = detailsMaterial;
    carModel.getObjectByName( 'trim' ).material = detailsMaterial;

    carModel.getObjectByName( 'glass' ).material = glassMaterial;

    carModel.wheels = []
    carModel.wheels.push(
      carModel.getObjectByName( 'wheel_fl' ),
      carModel.getObjectByName( 'wheel_fr' ),
      carModel.getObjectByName( 'wheel_rl' ),
      carModel.getObjectByName( 'wheel_rr' )
    );

    // shadow
    const mesh: any = new THREE.Mesh(
      new THREE.PlaneGeometry( 0.655 * 4, 1.3 * 4 ),
      new THREE.MeshBasicMaterial( {
        map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
      } )
    );
    mesh.rotation.x = - Math.PI / 2;
    mesh.renderOrder = 2;
    carModel.scale.set(10, 10, 10)
    carModel.add( mesh );
    carModel.userData.name = "0000"
    scene.add( carModel );
  });
}

var animate = function () {
  requestAnimationFrame(animate);
  
  renderer.render(scene, camera);
};

onMounted(() => {
  init()
})
</script>