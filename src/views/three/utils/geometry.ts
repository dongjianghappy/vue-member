import { threeConfig } from "@/assets/threeConst";

// 正方体
export const BoxGeometry = (params: any = {}) => {
  const {THREE, scene, ThreeFn, position, widthSegments, number, rotateY} = params
  
  const config = threeConfig.BoxGeometry
  let width = config.width
  let height = config.height
  let depth = config.depth
  let color: any = config.color
  let image: any = ""
  let isMorePlane = '0'
  let map: any = []
  let material

  if(params.data && params.data.content){
    const { parameters, material } = params.data.content
    width = parameters.width
    height = parameters.height
    depth = parameters.depth
    isMorePlane = material.isMorePlane
    color = material.color
    image = material.image
    map = material.map
  }

  const geometry = new THREE.BoxGeometry( width, height, depth ); 
  
  if(map.length && isMorePlane == '1'){
    const materialArray: any = []
    for(let i = 0; i < 6; i++){
      let _image = map[i] ? map[i].image : ''
      let _color = map[i] ? map[i].color : color
      let _material = ""

      if(_image){
        _material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( _image ), side: THREE.DoubleSide, _color})
      }else{
        _material = new THREE.MeshBasicMaterial( { _color } ); 
      }
      materialArray.push(_material)
    }
    material = materialArray
  }else{
    if(image){
      material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( image ), side: THREE.DoubleSide, color})
    }else{
      material = new THREE.MeshBasicMaterial( { color } ); 
    }
  }
  const cube = new THREE.Mesh( geometry, material); 
  
  if(cube.material.map){
    cube.material.map.wrapS = THREE.RepeatWrapping;
    cube.material.map.wrapT = THREE.RepeatWrapping;
    cube.material.map.encoding = THREE.sRGBEncoding;
    cube.material.map.flipY = false
  }
  
  scene.add( cube );
  ThreeFn && ThreeFn.customizeItem(params, cube)
}

// 圆形缓冲几何体
export const CircleGeometry = (params: any = {}) => {
  const {THREE, scene, ThreeFn } = params
  
  const config = threeConfig.CircleGeometry
  let radius = config.radius
  let segments = config.segments
  let color: any = config.color
  let image: any = ""
  let material
  
  if(params.data && params.data.content){
    const { parameters, material } = params.data.content
    radius = parameters.radius
    segments = parameters.segments
    color = material.color
    image = material.image
  }  

  const geometry = new THREE.CircleGeometry( radius, segments ); 
  if(image){
    material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image) , side: THREE.DoubleSide, color })
  }else{
    material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color } ); 
  }

  const cube = new THREE.Mesh( geometry, material ); 

  if(cube.material.map){
    cube.material.map.wrapS = THREE.RepeatWrapping;
    cube.material.map.wrapT = THREE.RepeatWrapping;
    cube.material.map.encoding = THREE.sRGBEncoding;
    cube.material.map.flipY = false
  }
  debugger
  scene.add( cube );
  ThreeFn && ThreeFn.customizeItem(params, cube)
}

// 圆锥缓冲几何体
export const ConeGeometry = (params: any = {}) => {
  const {THREE, scene, ThreeFn } = params
  
  const config = threeConfig.ConeGeometry
  let radius = config.radius
  let height = config.height
  let radialSegments = config.radialSegments
  let color: any = config.color
  let image: any = ""
  let material
  
  if(params.data && params.data.content){
    const { parameters, material } = params.data.content
    radius = parameters.radius
    height = parameters.height
    radialSegments = parameters.radialSegments
    color = material.color
    image = material.image
  }

  const geometry = new THREE.ConeGeometry( radius, height, radialSegments ); 
  if(image){
    material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image) , side: THREE.DoubleSide, color })
  }else{
    material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color } ); 
  }
  const cube = new THREE.Mesh( geometry, material ); 

  if(cube.material.map){
    cube.material.map.wrapS = THREE.RepeatWrapping;
    cube.material.map.wrapT = THREE.RepeatWrapping;
    cube.material.map.encoding = THREE.sRGBEncoding;
    cube.material.map.flipY = false
  }
  
  scene.add( cube );
  ThreeFn && ThreeFn.customizeItem(params, cube)
}

// 圆柱缓冲几何体
export const CylinderGeometry = (params: any = {}) => {
  const {THREE, scene, ThreeFn } = params
  
  const config = threeConfig.CylinderGeometry
  let radiusTop = config.radiusTop
  let radiusBottom = config.radiusBottom
  let height = config.height
  let radialSegments = config.radialSegments
  let color: any = config.color
  let image: any = ""
  let material
  
  if(params.data && params.data.content){
    const { parameters, material } = params.data.content
    radiusTop = parameters.radiusTop
    radiusBottom = parameters.radiusBottom
    height = parameters.height
    radialSegments = parameters.radialSegments
    color = material.color
    image = material.image
  }

  const geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radialSegments ); 
  if(image){
    material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image) , side: THREE.DoubleSide, color })
  }else{
    material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color } ); 
  }

  const cube = new THREE.Mesh( geometry, material ); 

  if(cube.material.map){
    cube.material.map.wrapS = THREE.RepeatWrapping;
    cube.material.map.wrapT = THREE.RepeatWrapping;
    cube.material.map.encoding = THREE.sRGBEncoding;
    cube.material.map.flipY = false
  }
  
  scene.add( cube );
  ThreeFn && ThreeFn.customizeItem(params, cube)
}

// 平面缓冲几何体
export const PlaneGeometry = (params: any = {}) => {
  const { THREE, scene, ThreeFn } = params
  
  const config = threeConfig.PlaneGeometry
  let width = config.width
  let height = config.height
  let color: any = config.color
  let image: any = ""
  let material
  
  if(params.data && params.data.content){
    const { parameters, material } = params.data.content
    width = parameters.width
    height = parameters.height
    color = material.color
    image = material.image
  }
  
  const geometry = new THREE.PlaneGeometry( width, height );
  if(image){
    material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image) , side: THREE.DoubleSide, color })
  }else{
    material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color } ); 
  }
  
  const plane = new THREE.Mesh( geometry, material ); 

  if(plane.material.map){
    plane.material.map.wrapS = THREE.RepeatWrapping;
    plane.material.map.wrapT = THREE.RepeatWrapping;
    plane.material.map.encoding = THREE.sRGBEncoding;
    plane.material.map.flipY = false
  }
  
  scene.add( plane );
  ThreeFn && ThreeFn.customizeItem(params, plane)
}

// 球缓冲几何体
export const SphereGeometry = (params: any = {}) => {
  const { THREE, scene, ThreeFn } = params
  
  const config = threeConfig.SphereGeometry
  let radius = config.radius
  let widthSegments = config.widthSegments
  let heightSegments = config.heightSegments
  let color: any = config.color
  let image: any = ""
  let material
  
  if(params.data && params.data.content){
    const { parameters, material } = params.data.content
    radius = parameters.radius
    widthSegments = parameters.widthSegments
    heightSegments = parameters.heightSegments
    color = material.color
    image = material.image
  }
  
  const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments ); 
  if(image){
    material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image) , side: THREE.DoubleSide, color })
  }else{
    material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color } ); 
  } 
  
  const plane = new THREE.Mesh( geometry, material ); 

  if(plane.material.map){
    plane.material.map.wrapS = THREE.RepeatWrapping;
    plane.material.map.wrapT = THREE.RepeatWrapping;
    plane.material.map.encoding = THREE.sRGBEncoding;
    plane.material.map.flipY = false
  }
  
  scene.add( plane );
  ThreeFn && ThreeFn.customizeItem(params, plane)
}