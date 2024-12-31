import { geometryInfo } from "@/views/three/utils/data/geometry";

// 正方体
export const BoxGeometry = (params: any = {}) => {
  const {THREE, scene, ThreeFn } = params
  let boxMaterial
  
  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...geometryInfo }
    initData.fid = params.data.id
    initData.parameters = {
      width: 200,
      height: 200,
      depth: 200,
    }
    params.data = initData
  }
  
  const { parameters, material } = params.data
  const geometry = new THREE.BoxGeometry( parameters.width, parameters.height, parameters.depth ); 
  
  if(material.map.length && material.isMorePlane == '1'){
    const materialArray: any = []
    for(let i = 0; i < 6; i++){
      let _material = ""
      let _image = material.map[i] ? material.map[i].image : ''
      let _color = material.map[i] ? material.map[i].color : material.color

      if(_image){
        _material = new THREE[material.materialType]({ map: new THREE.TextureLoader().load( _image ), side: THREE[material.side], _color})
      }else{
        _material = new THREE[material.materialType]( { side: THREE[material.side], _color } ); 
      }
      materialArray.push(_material)
    }
    boxMaterial = materialArray
  }else{
    if(material.image){
      boxMaterial = new THREE[material.materialType]({ 
        map: new THREE.TextureLoader().load( material.image ),
        side: THREE[material.side], 
        color: material.color,
        emissive: material.emissive,
        emissiveIntensity: material.emissiveIntensity,
        sepcular: material.sepcular
      })
    }else{
      boxMaterial = new THREE[material.materialType]( {
        side: THREE[material.side],
        color: material.color 
      } ); 
    }
  }
  const cube = new THREE.Mesh( geometry, boxMaterial); 
  
  if(cube.material.map){
    cube.material.map.wrapS = THREE.RepeatWrapping;
    cube.material.map.wrapT = THREE.RepeatWrapping;
    cube.material.map.encoding = THREE.sRGBEncoding;
    cube.material.map.flipY = false
  }

  // cube.material.emissive.set(0xff0000) // 白色发光
  // cube.material.emissiveIntensity =.1 // 设置材质的发光强度
  // cube.material.sepcular =0x000000 // 设置材质的反射颜色

  cube.userData = params.data
  scene.add( cube );
  ThreeFn && ThreeFn.customizeItem(params, cube)
}

// 圆形缓冲几何体
export const CircleGeometry = (params: any = {}) => {
  const {THREE, scene, ThreeFn } = params
  let circleMaterial

  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...geometryInfo }
    initData.fid = params.data.id
    initData.parameters = {
      radius: 250,
      segments: 100
    }
    params.data = initData
  }
  
  const { parameters, material } = params.data
  const geometry = new THREE.CircleGeometry( parameters.radius, parameters.segments ); 
  if(material.image){
    circleMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(material.image) , side: THREE.DoubleSide, color: material.color })
  }else{
    circleMaterial = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color: material.color } ); 
  }

  const cube = new THREE.Mesh( geometry, circleMaterial ); 

  if(cube.material.map){
    cube.material.map.wrapS = THREE.RepeatWrapping;
    cube.material.map.wrapT = THREE.RepeatWrapping;
    cube.material.map.encoding = THREE.sRGBEncoding;
    cube.material.map.flipY = false
  }
  
  cube.userData = params.data
  scene.add( cube );
  ThreeFn && ThreeFn.customizeItem(params, cube)
}

// 圆锥缓冲几何体
export const ConeGeometry = (params: any = {}) => {
  const {THREE, scene, ThreeFn } = params
  let coneMaterial

  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...geometryInfo }
    initData.fid = params.data.id
    initData.parameters = {
      radius: 100,
      height: 100,
      radialSegments: 100
    }
    params.data = initData
  }

  const { parameters, material } = params.data
  const geometry = new THREE.ConeGeometry( parameters.radius, parameters.height, parameters.radialSegments ); 
  if(material.image){
    coneMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(material.image) , side: THREE.DoubleSide, color: material.color })
  }else{
    coneMaterial = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color: material.color } ); 
  }
  const cube = new THREE.Mesh( geometry, coneMaterial ); 

  if(cube.material.map){
    cube.material.map.wrapS = THREE.RepeatWrapping;
    cube.material.map.wrapT = THREE.RepeatWrapping;
    cube.material.map.encoding = THREE.sRGBEncoding;
    cube.material.map.flipY = false
  }
  
  cube.userData = params.data
  scene.add( cube );
  ThreeFn && ThreeFn.customizeItem(params, cube)
}

// 圆柱缓冲几何体
export const CylinderGeometry = (params: any = {}) => {
  const {THREE, scene, ThreeFn } = params
  let cylinderMaterial

  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...geometryInfo }
    initData.fid = params.data.id
    initData.parameters = {
      radiusTop: 100,
      radiusBottom: 100,
      height: 100,
      radialSegments: 100
    }
    params.data = initData
  }
  
  const { parameters, material } = params.data
  const geometry = new THREE.CylinderGeometry( parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments ); 
  if(material.image){
    cylinderMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(material.image) , side: THREE.DoubleSide, color: material.color })
  }else{
    cylinderMaterial = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color: material.color } ); 
  }

  const cube = new THREE.Mesh( geometry, cylinderMaterial ); 

  if(cube.material.map){
    cube.material.map.wrapS = THREE.RepeatWrapping;
    cube.material.map.wrapT = THREE.RepeatWrapping;
    cube.material.map.encoding = THREE.sRGBEncoding;
    cube.material.map.flipY = false
  }
  
  cube.userData = params.data
  scene.add( cube );
  ThreeFn && ThreeFn.customizeItem(params, cube)
}

// 平面缓冲几何体
export const PlaneGeometry = (params: any = {}) => {
  const { THREE, scene, ThreeFn } = params
  let planeMaterial

  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...geometryInfo }
    initData.fid = params.data.id
    initData.parameters = {
      width: 300,
      height: 300
    }
    params.data = initData
  }
  
  const { parameters, material } = params.data
  const geometry = new THREE.PlaneGeometry( parameters.width, parameters.height );
  
  if(material.image){
    planeMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(material.image) , side: THREE.DoubleSide, color: material.color })
  }else{
    planeMaterial = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color: material.color } ); 
  }
  
  const plane = new THREE.Mesh( geometry, planeMaterial ); 

  if(plane.material.map){
    plane.material.map.wrapS = THREE.RepeatWrapping;
    plane.material.map.wrapT = THREE.RepeatWrapping;
    plane.material.map.encoding = THREE.sRGBEncoding;
    plane.material.map.flipY = false
  }
  
  plane.userData = params.data
  scene.add( plane );
  ThreeFn && ThreeFn.customizeItem(params, plane)
}

// 球缓冲几何体
export const SphereGeometry = (params: any = {}) => {
  const { THREE, scene, ThreeFn } = params
  let sphereMaterial

  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...geometryInfo }
    initData.fid = params.data.id
    initData.parameters = {
      radius: 100,
      widthSegments: 100,
      heightSegments: 100
    }
    params.data = initData
  }

  const { parameters, material } = params.data
  const geometry = new THREE.SphereGeometry( parameters.radius, parameters.widthSegments, parameters.heightSegments ); 
  
  if(material.image){
    sphereMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(material.image) , side: THREE.DoubleSide, color: material.color })
  }else{
    sphereMaterial = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color: material.color } ); 
  } 
  
  const plane = new THREE.Mesh( geometry, sphereMaterial ); 

  if(plane.material.map){
    plane.material.map.wrapS = THREE.RepeatWrapping;
    plane.material.map.wrapT = THREE.RepeatWrapping;
    plane.material.map.encoding = THREE.sRGBEncoding;
    plane.material.map.flipY = false
  }
  
  plane.userData = params.data
  scene.add( plane );
  ThreeFn && ThreeFn.customizeItem(params, plane)
}