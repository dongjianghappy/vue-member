// 草坪
export const glassFn = (params: any = {}) => {
  const {THREE, scene, ThreeFn, position, width, height, widthSegments, number, rotateY} = params

  const group = new THREE.Group()

  const geometry = new THREE.PlaneGeometry( width * widthSegments, height );
  const texture = new THREE.TextureLoader().load('/three/textures/terrain/grasslight-big.jpg');
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