import { color } from "@/assets/common_const";

// 草坪
export const glassFn = (params: any = {}) => {
  const {THREE, scene, ThreeFn, position, width, height, widthSegments, number, rotateY} = params

  const group = new THREE.Group()

  const geometry = new THREE.PlaneGeometry( width * widthSegments, height );
  const texture = new THREE.TextureLoader().load('/images/three/grasslight-big.jpg');
  // new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
  const material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide ,color:'#fff'})
  for(let i = 0; i < number; i++){
    const plane = new THREE.Mesh( geometry, material );

    plane.material.map.repeat.set(3, 1);
    plane.material.map.wrapS = THREE.RepeatWrapping;
    plane.material.map.wrapT = THREE.RepeatWrapping;
    plane.material.map.colorSpace = THREE.SRGBColorSpace;
    plane.rotateX(1.5721)
    plane.position.z = width*i
    group.add( plane );
  } 
  group.position.y = 2
  group.position.x = position.x
  group.position.z = position.z

  if(params.actionType === 'render'){
    group.rotation.y = params.data.content.rotation.z
  }else{
    group.rotation.y = rotateY || 0
  }
  // if(rotateY){
  //   group.rotateY(rotateY)
  // }
  scene.add( group );
  ThreeFn && ThreeFn.customizeItem(params, group)
}

// 正方体
export const BoxGeometry = (params: any = {}) => {
  const {THREE, scene, ThreeFn, position, width, height, depth, widthSegments, number, rotateY} = params
  
  let color: any = 0x00ff00
  let image: any = "/images/three/2.jpg"
  let _width = width || 10
  let _height = height || 10
  let _depth = depth || 10
  let isMorePlane = '0'
  let map: any = []
  if(params.data && params.data.content){
    const { parameters, material } = params.data.content
    _width = parameters.width
    _height = parameters.height
    _depth = parameters.depth
    isMorePlane = material.isMorePlane
    color = material.color
    image = material.image
    map = material.map
  }

  const geometry = new THREE.BoxGeometry( _width, _height, _depth ); 
  let material

  if(map.length && isMorePlane == '1'){
    const materialArray: any = []
    for(let i = 0; i < 6; i++){
      let img: any= "/images/three/4.jpg"
      color = "#00ffff"
      img = map[i] ? map[i].image : img
      color = map[i] ? map[i].color : color
      
      let _material: any = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(img) , side: THREE.DoubleSide, color: color || '#fff'})
      materialArray.push(_material)
    }
    material = materialArray
  }else{
    material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("/images/three/2.jpg") , side: THREE.DoubleSide, color: color || '#fff'})
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
  const {THREE, scene, ThreeFn, position, width, height, depth, widthSegments, number, rotateY} = params
  
  let color: any = 0x00ff00
  let image: any = "/three/images/2.jpg"
  let _width = width || 10
  let _height = height || 10
  if(params.data && params.data.content){
    const { parameters } = params.data.content
    color = params.data.content.material.color
    image = params.data.content.material.map && params.data.content.material.map[0]
    _width = parameters.radius
    _height = parameters.segments
  }

  let material = ""
  
  
  const geometry = new THREE.CircleGeometry( _width, _height ); 
  // material = new THREE.MeshBasicMaterial( { color } ); 

  material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image) , side: THREE.DoubleSide, color: color || '#fff'})
  
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
  const {THREE, scene, ThreeFn, position, width, height, depth, widthSegments, number, rotateY} = params
  
  let color: any = 0x00ff00
  let image: any = "/images/2.jpg"
  let _width = width || 10
  let _height = height || 10
  let _depth = depth || 10
  if(params.data && params.data.content){
    const { parameters } = params.data.content
    color = params.data.content.material.color
    image = params.data.content.material.map && params.data.content.material.map[0]
    _width = parameters.radius
    _height = parameters.height
    _depth = parameters.radialSegments
  }
debugger
  let material = ""
  
  
  const geometry = new THREE.ConeGeometry( _width, _height, _depth ); 
  // material = new THREE.MeshBasicMaterial( { color } ); 

  material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image) , side: THREE.DoubleSide, color: color || '#fff'})
  
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
  const {THREE, scene, ThreeFn, position, width, height, depth, widthSegments, number, rotateY} = params
  
  let color: any = 0x00ff00
  let image: any = "/images/2.jpg"
  let _width = width || 10
  let _height = height || 10
  let _depth = depth || 10
  let _radialSegments = 10
  if(params.data && params.data.content){
    const { parameters } = params.data.content
    color = params.data.content.material.color
    image = params.data.content.material.map && params.data.content.material.map[0]
    _width = parameters.radiusTop
    _height = parameters.radiusBottom
    _depth = parameters.height
    _radialSegments = parameters.radialSegments
  }

  let material = ""
  
  
  const geometry = new THREE.CylinderGeometry( _width, _height, _depth, _radialSegments ); 
  // material = new THREE.MeshBasicMaterial( { color } ); 

  material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image) , side: THREE.DoubleSide, color: color || '#fff'})
  
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
  const {THREE, scene, ThreeFn, position, width, height, depth, widthSegments, number, rotateY} = params
  
  let _color: any = 0x00ff00
  let image: any = "/images/three/4.jpg"
  let _width = width || 10
  let _height = height || 10
  if(params.data && params.data.content){
    const { parameters } = params.data.content
    _color = params.data.content.material.color
    image = params.data.content.material.map && params.data.content.material.map[0]
    _width = parameters.width
    _height = parameters.height
  }

  let material = ""
  
  let img: any= "/images/three/4.jpg"
  let color = "#00ffff"
  img = image || img
  color = _color || color
  
  const geometry = new THREE.PlaneGeometry( _width, _height ); 
  // material = new THREE.MeshBasicMaterial( { color } ); 

  material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(img) , side: THREE.DoubleSide, color: color || '#fff'})
  
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
  const {THREE, scene, ThreeFn, position, width, height, depth, widthSegments, number, rotateY} = params
  debugger
  let color: any = 0x00ff00
  let image: any = "/images/2.jpg"
  let _width = width || 10
  let _height = height || 10
  let _depth = depth || 10
  if(params.data && params.data.content){
    const { parameters } = params.data.content
    color = params.data.content.material.color
    image = params.data.content.material.map && params.data.content.material.map[0]
    _width = parameters.radius
    _height = parameters.widthSegments
    _depth = parameters.heightSegments
  }

  let material = ""
  
  
  const geometry = new THREE.SphereGeometry( _width, _height, _depth ); 
  // material = new THREE.MeshBasicMaterial( { color } ); 

  material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image) , side: THREE.DoubleSide, color: color || '#fff'})
  
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

// 文本
export const createText = (params: any = {}, item: any) => {

  const { ThreeFn, THREE, scene} = params

  let text = "文本"
  let color = '#ffff00'
  let size = 24
  let position: any = {
    x: 0,
    y: 0,
    z: 0
  }
  if(params.data.content && params.data.content.material.text && params.data.content.material.text.content){
    text = params.data.content.material.text.content
    color = params.data.content.material.text.color
    size = params.data.content.material.text.size
    position = params.data.content.material.text.position
  }
  
  const exitButtonText2 = params.createText(text, size);
  exitButtonText2.position.set(parseInt(position.x), parseInt(position.y), parseInt(position.z));

  exitButtonText2.material.color = new THREE.Color(color)
  if(params.data.value === 'createText'){
    scene.add(exitButtonText2);
    ThreeFn && ThreeFn.customizeItem(params, exitButtonText2)
  }else{
    item.add(exitButtonText2);
  }
  
}

// 路线
export const roadLine = (params: any = {}) => {
  const { THREE, scene, model, points }: any = params
  const line: any = []
  points.forEach((item: any) => {
    line.push(new THREE.Vector3( parseInt(item.x), parseInt(item.y), parseInt(item.z)))
  });
  
  const curve = new THREE.CatmullRomCurve3( line );

  if(curve.points.length < 2){
    return
  }

  if(model){
    model.roadLine = curve
  }else{
    const _points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( _points );
    
    const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    const curveObject = new THREE.Line( geometry, material );
    curveObject.position.y = 5
  
    scene.children = scene.children.filter((item: any) => item.userData.id !== 'line_'+params.id )
    curveObject.userData.isRoad = true
    curveObject.userData.id = 'line_'+params.id
  
    scene.add(curveObject)
  }
}




// 卫星
export const weixingGeometry = (params: any = {}) => {
  const {THREE, scene, ThreeFn, position, width, height, depth, widthSegments, number, rotateY} = params
  debugger
  let color: any = 0x00ff00
  let image: any = "/images/2.jpg"
  let _width = width || 10
  let _height = height || 10
  let _depth = depth || 10
  if(params.data && params.data.content){
    const { parameters } = params.data.content
    color = params.data.content.material.color
    image = params.data.content.material.map && params.data.content.material.map[0]
    _width = parameters.radius
    _height = parameters.widthSegments
    _depth = parameters.heightSegments
  }

  let material = ""
  
  
  const geometry = new THREE.SphereGeometry( _width, _height, _depth ); 
  // material = new THREE.MeshBasicMaterial( { color } ); 

  material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image) , side: THREE.DoubleSide, color: color || '#fff'})
  
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