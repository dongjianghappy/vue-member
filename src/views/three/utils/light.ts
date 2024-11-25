// 环境光
export const AmbientLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params
  
  debugger
  let color: any = data.color || 0x404040
  if(data.content) {
    color = data.content.parameters.color
  }
  
  const light = new THREE.AmbientLight( color ); // 柔和的白光
  scene.add( light );
  ThreeFn && ThreeFn.customizeItem(params, light)
}

// 平行光
export const DirectionalLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params

  let color: any = data.color || 0xffffff
  if(data.content) {
    color = data.content.parameters.color
  }
  
  // 从上方照射的白色平行光，强度为 0.5。
  const directionalLight = new THREE.DirectionalLight( color, 0.5 );
  scene.add( directionalLight );
  ThreeFn && ThreeFn.customizeItem(params, directionalLight)
}

// 半球光
export const HemisphereLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params
  
  let color: any = data.color || 0xffffbb
  let groundColor: any = data.groundColor || 0x080820
  if(data.content) {
    color = data.content.parameters.color
    groundColor = data.content.parameters.groundColor
  }

  const light = new THREE.HemisphereLight( color, groundColor, 1 );
  scene.add( light );
  ThreeFn && ThreeFn.customizeItem(params, light)
}

// 光照探针
export const LightProbe = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params
  
  debugger
  let color: any = data.color || 0xffffff
  if(data.content) {
    color = data.content.parameters.color
  }
  
  const directionalLight = new THREE.LightProbe( color, 0.5 );
  scene.add( directionalLight );
  ThreeFn && ThreeFn.customizeItem(params, directionalLight)
}

// 点光源
export const PointLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params
  
  let color: any = data.color || 0xff0000
  let intensity: any = data.intensity || 1
  let distance: any = data.distance || 0
  let decay: any = data.decay || 2

  if(data.content) {
    color = data.content.parameters.color
    intensity = data.content.parameters.intensity
    distance = data.content.parameters.distance
    decay = data.content.parameters.decay
  }

  const light = new THREE.PointLight( color, intensity, distance, decay );
  light.position.set( 50, 50, 50 );
  scene.add( light );
  ThreeFn && ThreeFn.customizeItem(params, light)
}

// 平面光光源
export const RectAreaLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, RectAreaLightHelper, data }: any = params
  
  let color: any = data.color || 0xff0000
  let intensity: any = data.intensity || 1
  let width: any = data.width || 150
  let height: any = data.height || 150
  
  if(data.content) {
    color = data.content.parameters.color
    intensity = data.content.parameters.intensity
    width = data.content.parameters.width
    height = data.content.parameters.height
  }
  
  const rectLight = new THREE.RectAreaLight( color, intensity,  width, height );
  rectLight.position.set( 5, 5, 0 );
  rectLight.lookAt( 0, 0, 0 );
  scene.add( rectLight )
  
  // const rectLightHelper = new RectAreaLightHelper( rectLight );
  // scene.add( rectLightHelper );
  ThreeFn && ThreeFn.customizeItem(params, rectLight)
}

// 聚光灯
export const SpotLight = (params: any = {}) => {
  const { THREE, scene, ThreeFn, data }: any = params
  debugger
  let color: any = data.color || 0xff0000
  let intensity: any = data.intensity || 1
  let distance: any = data.distance || 0
  let angle: any = data.angle || Math.PI/3
  let penumbra: any = data.penumbra || 0
  let decay: any = data.decay || 2
  
  if(data.content) {
    color = data.content.parameters.color
    intensity = data.content.parameters.intensity
    distance = data.content.parameters.distance
    angle = data.content.parameters.angle
    penumbra = data.content.parameters.penumbra
    decay = data.content.parameters.decay
  }

const spotLight = new THREE.SpotLight( color, intensity, distance, angle, decay );
spotLight.position.set( 100, 1000, 100 );
// spotLight.map = new THREE.TextureLoader().load( url );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );
ThreeFn && ThreeFn.customizeItem(params, spotLight)
}
