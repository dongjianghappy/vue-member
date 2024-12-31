import { lightInfo } from "@/views/three/utils/data/geometry";

// 环境光
export const AmbientLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params
  
  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...lightInfo }
    initData.fid = params.data.id
    initData.parameters = {
      color: 0x404040,
      intensity: 1
    }
    params.data = initData
  }
  
  const { parameters } = params.data
  const light = new THREE.AmbientLight( parameters.color, parameters.intensity ); // 柔和的白光
  
  light.userData = params.data
  scene.add( light );
  ThreeFn && ThreeFn.customizeItem(params, light)
}

// 平行光
export const DirectionalLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params

  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...lightInfo }
    initData.fid = params.data.id
    initData.parameters = {
      color: 0xffffff,
      intensity: 0.5
    }
    params.data = initData
  }
  
  const { parameters } = params.data
  const directionalLight = new THREE.DirectionalLight( parameters.color, parameters.intensity );
  
  directionalLight.userData = params.data
  scene.add( directionalLight );
  ThreeFn && ThreeFn.customizeItem(params, directionalLight)
}

// 半球光
export const HemisphereLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params
  
  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...lightInfo }
    initData.fid = params.data.id
    initData.parameters = {
      color: 0xffffbb,
      groundColor: 0x080820,
      intensity: 1
    }
    params.data = initData
  }
  
  const { parameters } = params.data
  const light = new THREE.HemisphereLight( parameters.color, parameters.groundColor, parameters.intensity );
  
  light.userData = params.data
  scene.add( light );
  ThreeFn && ThreeFn.customizeItem(params, light)
}

// 光照探针
export const LightProbe = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params
  
  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...lightInfo }
    initData.fid = params.data.id
    initData.parameters = {
      color: 0xffffff,
      intensity: 0.5
    }
    params.data = initData
  }

  const { parameters } = params.data
  const directionalLight = new THREE.LightProbe( parameters.color, parameters.intensity );
  
  directionalLight.userData = params.data
  scene.add( directionalLight );
  ThreeFn && ThreeFn.customizeItem(params, directionalLight)
}

// 点光源
export const PointLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params
  
  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...lightInfo }
    initData.fid = params.data.id
    initData.parameters = {
      color: 0xffffff,
      intensity: 0.5,
      distance: 0,
      decay: 0
    }
    params.data = initData
  }

  const { parameters } = params.data
  const light = new THREE.PointLight( parameters.color, parameters.intensity, parameters.distance, parameters.decay );
  light.position.set( 50, 50, 50 );

  light.userData = params.data
  scene.add( light );
  ThreeFn && ThreeFn.customizeItem(params, light)
}

// 平面光光源
export const RectAreaLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, RectAreaLightHelper, data }: any = params
  
  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...lightInfo }
    initData.fid = params.data.id
    initData.parameters = {
      color: 0xff0000,
      intensity: 0.5,
      width: 250,
      height: 250
    }
    params.data = initData
  }

  const { parameters } = params.data
  const rectLight = new THREE.RectAreaLight( parameters.color, parameters.intensity,  parameters.width, parameters.height );
  rectLight.position.set( 5, 5, 0 );
  rectLight.lookAt( 0, 0, 0 );
  rectLight.userData = params.data
  scene.add( rectLight )
  
  // const rectLightHelper = new RectAreaLightHelper( rectLight );
  // scene.add( rectLightHelper );
  ThreeFn && ThreeFn.customizeItem(params, rectLight)
}

// 聚光灯
export const SpotLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params
  
  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...lightInfo }
    initData.fid = params.data.id
    initData.parameters = {
      color: 0xff0000,
      intensity: 0.5,
      distance: 0,
      angle: Math.PI/3,
      penumbra: 0,
      decay: 100
    }
    params.data = initData
  }
debugger
  const { parameters } = params.data
  const spotLight = new THREE.SpotLight( parameters.color, parameters.intensity, parameters.distance, parameters.angle, parameters.decay );
  spotLight.position.set( 100, 1000, 100 );
  // spotLight.map = new THREE.TextureLoader().load( url );

  spotLight.castShadow = true;

  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;

  spotLight.userData = params.data
  scene.add( spotLight );
  ThreeFn && ThreeFn.customizeItem(params, spotLight)
}